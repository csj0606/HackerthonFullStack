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
  margin-top: 10%;
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

const CreateTestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [basicInfo, setBasicInfo] = useState({});
  const [antibioticInfo, setAntibioticInfo] = useState({
    current: "",
    history: "",
    resistant: [],
  });

  useEffect(() => {
    if (location.state) {
      setBasicInfo(location.state);
    }
  }, [location.state]);

  const fullData = {
    ...basicInfo,
    ...antibioticInfo,
  };

  const toPatientRequest = (formData) => {
    return {
      name: formData.patientId,
      ageGroup: ageMap[formData.age],
      gender: formData.gender,
      underlyingDiseases: formData.diseases,
      recentlyHospitalized: formData.hospitalized === "yes",
    };
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      console.log("등록 성공:", result);
    } catch (err) {
      console.error("에러:", err.message);
    }

    navigate(`/createNew/test_result`, { state: fullData });
  };

  const handleBack = () => {
    navigate("/createNew/antibiotics", { state: basicInfo });
  };

  return (
    <Container>
      <LeftSection>
        <h1>기본 결과를 입력해주세요.</h1>
        <p>혈액 또는 소변을 통한 검사는 2~3시간 후 결과를 알 수 있습니다.</p>
      </LeftSection>

      <RightSection>
        <div>
          <Label>검체명</Label>
          <Input
            placeholder="Select or Enter Current Antibiotics"
            value={antibioticInfo.current}
            onChange={(e) =>
              setAntibioticInfo({ ...antibioticInfo, current: e.target.value })
            }
          />
          <SubText>Include start date</SubText>
        </div>

        <div>
          <Label>검사명</Label>
          <Input
            placeholder="Enter Recent Antibiotic History"
            value={antibioticInfo.history}
            onChange={(e) =>
              setAntibioticInfo({ ...antibioticInfo, history: e.target.value })
            }
          />
          <SubText>Include medication, duration, frequency</SubText>
        </div>

        <div>
          <Label>수치결과내용</Label>
          <Input
            placeholder="Enter Recent Antibiotic History"
            value={antibioticInfo.history}
            onChange={(e) =>
              setAntibioticInfo({ ...antibioticInfo, history: e.target.value })
            }
          />
          <SubText>Include medication, duration, frequency</SubText>
        </div>

        <div>
          <Label>부검사명</Label>
          <Input
            placeholder="Enter Recent Antibiotic History"
            value={antibioticInfo.history}
            onChange={(e) =>
              setAntibioticInfo({ ...antibioticInfo, history: e.target.value })
            }
          />
          <SubText>Include medication, duration, frequency</SubText>
        </div>

        <div>
          <Label>부검사 결과</Label>
          <Input
            placeholder="Enter Recent Antibiotic History"
            value={antibioticInfo.history}
            onChange={(e) =>
              setAntibioticInfo({ ...antibioticInfo, history: e.target.value })
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
