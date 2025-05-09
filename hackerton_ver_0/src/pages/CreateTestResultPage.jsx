import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 60px;
  box-sizing: border-box;
  background: white;
`;

const LeftSection = styled.div`
  flex: 1;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    color: gray;
  }
`;

const RightSection = styled.div`
  margin-top: 20px;
  text-align: left;
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Label = styled.div`
  font-size: 14px;
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
  width: 100%;
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
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  background: black;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

const BackButton = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  background: lightgray;
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

  const toPatientRequest = (formData) => ({
    name: formData.patientId,
    ageGroup: ageMap[formData.age],
    gender: formData.gender,
    underlyingDiseases: formData.diseases.map((kor) => diseaseMap[kor]),
    recentlyHospitalized: formData.hospitalized === "yes",
  });

  const handleSubmit = async () => {
    const payload = toPatientRequest(fullData);
    console.log(fullData);
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

      // 2. ID 기반 약물 등록 요청
      const medRes = await fetch(
        `http://localhost:8080/api/patients/${id}/medications`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            medicationNames: fullData.medications,
          }),
        }
      );

      if (!medRes.ok) throw new Error("약물 등록 실패");

      const medResult = await medRes.json();
      console.log("약물 등록 완료:", medResult);

      navigate(`/SimulatePage_1/${id}`, { state: fullData });
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
              onChange={(e) =>
                setTestResult({ ...testResult, result: e.target.value })
              }
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

        <SubmitButton onClick={handleSubmit}>Register</SubmitButton>
        <BackButton onClick={handleBack}>← Back</BackButton>
      </RightSection>
    </Container>
  );
};

export default CreateTestResult;
