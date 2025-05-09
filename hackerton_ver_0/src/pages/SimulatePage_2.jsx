import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 60px;
  box-sizing: border-box;
  background: white;
`;

const LeftPanel = styled.div`
  flex: 1;
  padding: 40px;

  h1 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  pre {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    font-size: 16px;
    white-space: pre-wrap;
    background: #fafafa;
  }
`;

const RightPanel = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 14px;
  color: gray;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
`;

const SubText = styled.p`
  font-size: 12px;
  color: gray;
`;

const Input = styled.input`
  padding: 14px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  background: black;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
`;

const SimulatePage2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(location.state || {});

  const [tests, setTests] = useState({
    blood: "",
    imaging: "",
    culture: "",
    resistance: "",
  });

  const handleSubmit = async () => {
    const fullData = {
      ...formData,
      testResults: tests,
    };

    try {
      const response = await axios.post(
        "https://your-api-endpoint.com/analyze",
        fullData
      );
      navigate("/output", { state: response.data });
    } catch (error) {
      console.error("API 요청 실패:", error);
      alert("서버 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <LeftPanel>
        <h1>남하원 환자의 진료 기록</h1>
        <pre>
          ID : {formData.patientInfo?.id}
          나이 : {formData.patientInfo?.age}
          성별 : {formData.patientInfo?.gender}
          체중 : {formData.patientInfo?.weight}키 :{" "}
          {formData.patientInfo?.height}
        </pre>
      </LeftPanel>

      <RightPanel>
        <Title>검사 결과를 입력해주세요.</Title>
        <Description>
          혈액검사, 영상검사, 배양검사 결과를 입력하면 예측 정확도가 더욱
          향상됩니다.
        </Description>

        <div>
          <Label>혈액검사 수치</Label>
          <Input
            placeholder="Enter Blood Test Results"
            value={tests.blood}
            onChange={(e) => setTests({ ...tests, blood: e.target.value })}
          />
          <SubText>WBC, CRP, PCT, BUN, Creatinine, AST/ALT, etc.</SubText>
        </div>

        <div>
          <Label>영상검사 요약</Label>
          <Input
            placeholder="Enter Imaging Test Summary"
            value={tests.imaging}
            onChange={(e) => setTests({ ...tests, imaging: e.target.value })}
          />
          <SubText>CT/X-ray brief description or text input</SubText>
        </div>

        <div>
          <Label>배양검사 결과</Label>
          <Input
            placeholder="Enter Culture Test Results"
            value={tests.culture}
            onChange={(e) => setTests({ ...tests, culture: e.target.value })}
          />
          <SubText>Presence and results of blood/urine/wound cultures</SubText>
        </div>

        <div>
          <Label>감염원 및 항생제 감수성 결과</Label>
          <Input
            placeholder="Enter Infective Agent and Antibiotic Susceptibility Results"
            value={tests.resistance}
            onChange={(e) => setTests({ ...tests, resistance: e.target.value })}
          />
          <SubText>Optional fields for data entry</SubText>
        </div>

        <Button onClick={handleSubmit}>Result &gt;&gt;</Button>
      </RightPanel>
    </Container>
  );
};

export default SimulatePage2;
