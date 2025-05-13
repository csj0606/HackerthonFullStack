import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 60px;
  box-sizing: border-box;
  background: linear-gradient(to bottom, rgb(255, 255, 255), #acd6d5);
`;

const LeftSection = styled.div`
  flex: 1;
  font-family: "Lilita One", sans-serif;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  color: black;
  font-weight: bold;

  h1 {
    width: 350px;
    font-size: 45px;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
  }
`;

const RightSection = styled.div`
  margin-top: 80px;
  text-align: left;
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Label = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const SubText = styled.div`
  font-size: 12px;
  color: gray;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 98%;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 6px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  width: 30%;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 20px;
`;

const SubmitButton = styled.button`
  float: right;
  width: 40%;
  padding: 16px;
  font-size: 16px;
  background: black;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

const BackButton = styled.button`
  float: left;
  width: 40%;
  padding: 16px;
  font-size: 16px;
  background: rgb(243, 243, 243);
  color: black;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;
const ageMap = {
  "0~9세": "AGE_0_9",
  "10~19세": "AGE_10_19",
  "20~29세": "AGE_20_29",
  "30~39세": "AGE_30_39",
  "40~49세": "AGE_40_49",
  "50~59세": "AGE_50_59",
  "60~69세": "AGE_60_69",
  "70세이상": "AGE_70_PLUS",
};

const diseaseMap = {
  전립선질환: "PROSTATE_DISEASE",
  요로결석: "UROLITHIASIS",
  당뇨: "DIABETES",
  면역저하: "IMMUNE_DEFICIENCY",
  선천성요로기형: "CONGENITAL_URINARY_TRACT_MALFORMATION",
  신장질환: "RENAL_DISEASE",
  배뇨장애: "VOIDING_DYSFUNCTION",
};

const CreateTestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [basicInfo, setBasicInfo] = useState({});
  const [antibioticInfo, setAntibioticInfo] = useState({});
  const [testResult, setTestResult] = useState({
    specimen: "",
    exam: "",
    resultOption: "", // "positive", "negative", or "manual"
    result: "",
    subExam: "",
    subResult: "",
  });

  useEffect(() => {
    if (location.state) {
      const {
        testResult: prevResult,
        antibioticInfo: prevAntibiotic,
        ...rest
      } = location.state;

      setBasicInfo(rest);
      if (prevResult) setTestResult(prevResult);
      if (prevAntibiotic) setAntibioticInfo(prevAntibiotic);
    }
  }, [location.state]);

  const handleOptionChange = (option) => {
    setTestResult((prev) => ({
      ...prev,
      resultOption: option,
      result: option === "manual" ? prev.result : option,
    }));
  };

  const fullData = {
    ...basicInfo,
    ...antibioticInfo,
    ...testResult,
  };

  const toPatientRequest = (fullData) => ({
    hospitalId: fullData.patientId,
    ageGroup: ageMap[fullData.age],
    gender: fullData.gender,
    underlyingDiseases: fullData.diseases.map((kor) => diseaseMap[kor]),
    antibiotics: fullData.recentantibiotics
      ? fullData.recentantibiotics.split(",").map((s) => s.trim())
      : [],
    medicationNames: fullData.medications
      ? fullData.medications.split(",").map((s) => s.trim())
      : [],
    recentlyHospitalized: fullData.hospitalized === "yes",
  });

  const handleSubmit = async () => {
    console.log(fullData);
    const payload = toPatientRequest(fullData);
    try {
      // 1. 환자 등록 요청
      const res = await fetch("http://localhost:8080/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("환자 등록 실패");

      const id = await res.json(); // 여기서 바로 숫자 ID 받음
      console.log("등록 성공, 받은 ID:", id);

      // 2. ID 기반 생징후 등록
      const vtres = await fetch(
        `http://localhost:8080/api/patients/${id}/vitals`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            patientId: id,
            heartRate: fullData.pulse_rate,
            respiratoryRate: fullData.breathing,
            temperature: fullData.temperature,
            systolicBP: fullData.SBP,
            diastolicBP: fullData.DBP,
          }),
        }
      );

      if (!vtres.ok) throw new Error("생징후 등록 실패");

      const vtresult = await vtres.json();
      console.log("생징후 등록 완료:", vtresult);

      // 3. ID 기반 검사 결과 등록
      const lbres = await fetch(
        `http://localhost:8080/api/patients/${id}/lab-result`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            patientId: id,
            specimenName: fullData.specimen,
            mainTestName: fullData.exam,
            mainTestResult: fullData.result,
            subTestName: fullData.subExam,
            subTestResult: fullData.subResult,
          }),
        }
      );

      if (!lbres.ok) throw new Error("검사 결과 등록 실패");

      const lbresult = await lbres.json();
      console.log("검사 결과 등록 완료:", lbresult);

      navigate(`/SimulatePage_1/${id}`, { state: { patientId: id } });
    } catch (err) {
      console.error("에러:", err.message);
    }
  };

  const handleBack = () => {
    navigate("/createNew/antibiotics", {
      state: {
        ...basicInfo,
        testResult,
      },
    });
  };

  return (
    <Container>
      <LeftSection>
        <h1>기본 검사 결과를 입력해주세요.</h1>
        <p>혈액 또는 소변을 통한 검사는 2~3시간 후 결과를 알 수 있습니다.</p>
      </LeftSection>

      <RightSection>
        <div>
          <Label>검체명</Label>
          <Input
            placeholder="Select or Enter Current Antibiotics"
            value={testResult.specimen}
            onChange={(e) =>
              setTestResult({ ...testResult, specimen: e.target.value })
            }
          />
          <SubText>Include start date</SubText>
        </div>
        <div>
          <Label>검사명</Label>
          <Input
            placeholder="Enter Recent Antibiotic History"
            value={testResult.exam}
            onChange={(e) =>
              setTestResult({ ...testResult, exam: e.target.value })
            }
          />
          <SubText>Include medication, duration, frequency</SubText>
        </div>
        <div>
          <Label>수치결과내용</Label>
          <Row>
            <CheckboxLabel>
              <Checkbox
                checked={testResult.resultOption === "positive"}
                onChange={() => handleOptionChange("positive")}
              />
              Positive
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox
                checked={testResult.resultOption === "negative"}
                onChange={() => handleOptionChange("negative")}
              />
              Negative
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox
                checked={testResult.resultOption === "manual"}
                onChange={() => handleOptionChange("manual")}
              />
              직접 입력
            </CheckboxLabel>
            <Input
              placeholder="Enter Result"
              disabled={testResult.resultOption !== "manual"}
              value={
                testResult.resultOption === "manual" ? testResult.result : ""
              }
              onChange={(e) => setTestResult({ ...testResult, result: none })}
            />
          </Row>
          <SubText>Include medication, duration, frequency</SubText>
        </div>
        <div>
          <Label>부검사명</Label>
          <Input
            placeholder="Enter Sub Test Name"
            value={testResult.subExam}
            onChange={(e) =>
              setTestResult({ ...testResult, subExam: e.target.value })
            }
          />
          <SubText>Include medication, duration, frequency</SubText>
        </div>
        <div>
          <Label>부검사 결과내용</Label>
          <Input
            placeholder="Enter Sub Test Result"
            value={testResult.subResult}
            onChange={(e) =>
              setTestResult({ ...testResult, subResult: e.target.value })
            }
          />
          <SubText>Include medication, duration, frequency</SubText>
        </div>
        <div>
          <SubmitButton onClick={handleSubmit}>Register</SubmitButton>
          <BackButton onClick={handleBack}>← Back</BackButton>
        </div>
      </RightSection>
    </Container>
  );
};

export default CreateTestResult;
