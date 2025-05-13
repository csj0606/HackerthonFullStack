import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  padding: 60px;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background: linear-gradient(to bottom, rgb(255, 255, 255), #acd6d5);
`;

const LeftPanel = styled.div`
  flex: 1;
  font-family: "Lilita One", sans-serif;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: black;
  font-weight: bold;

  h1 {
    text-align: center;
    width: 100%;
    font-size: 45px;
    margin-bottom: 20px;
  }

  pre {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    font-size: 16px;
    white-space: pre-wrap;
    background: rgb(255, 255, 255);
  }
`;

const RightPanel = styled.div`
  flex: 2;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  marin-bottom: 0;
`;

const Description = styled.p`
  margin-top: 0;
  font-size: 14px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2px;
`;

const SubText = styled.p`
  font-size: 12px;
  color: gray;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 14px;
  width: 98%;
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

const ageLabelMap = {
  AGE_0_9: "0~9세",
  AGE_10_19: "10~19세",
  AGE_20_29: "20~29세",
  AGE_30_39: "30~39세",
  AGE_40_49: "40~49세",
  AGE_50_59: "50~59세",
  AGE_60_69: "60~69세",
  AGE_70_PLUS: "70세 이상",
};

const Info = styled.div`
  aliign-items: center;
  font-size: 30px;
`;

const Button2 = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  background: none;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: none;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 999;
  font-size: 18px;
  color: #333;
`;

const SimulatePage1 = () => {
  const location = useLocation();
  const patientID = location.state?.patientId;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientInfo: {
      id: "",
      ageGroup: "",
      gender: "",
      weight: "",
      height: "",
    },
    symptoms: [],
    areas: [],
    bodySigns: "",
    severity: "",
  });
  const [tests, setTests] = useState({
    blood: "",
    imaging: "",
    culture: "",
    resistance: "",
  });

  useEffect(() => {
    if (patientID) {
      axios
        .get(`http://localhost:8080/api/patients/${patientID}`)
        .then((res) => {
          const data = res.data;
          console.log("Patient data:", data);
          setFormData((prev) => ({
            ...prev,
            patientInfo: {
              id: data.id,
              age: ageLabelMap[data.ageGroup],
              gender: data.gender,
              weight: data.weight,
              height: data.height,
            },
          }));
          console.log("Form data after fetching:", formData);
        })
        .catch((err) => console.error("Failed to load patient info:", err));
    }
  }, [patientID]);

  const handleSubmit = async () => {
    const fullData = {
      ...formData,
      ...tests,
    };

    try {
      const response = await axios.post(
        `https://your-api-endpoint.com/analyze/${patientID}`,
        fullData
      );
      navigate("/output", { state: response.data });
    } catch (error) {
      console.error("API 요청 실패:", error);
      alert("서버 통신 중 오류가 발생했습니다.");
    }
  };

  const handleexample = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setLoading(false);
    navigate(`/output/${patientID}`);
  };

  return (
    <Container>
      <LeftPanel>
        <h1>환자 정보</h1>
        <pre>
          <Info>
            <div>ID : {formData.patientInfo.id}</div>
            <div>나이 : {formData.patientInfo.age}</div>
            <div>성별 : {formData.patientInfo.gender}</div>
          </Info>
        </pre>
      </LeftPanel>
      {loading && <LoadingOverlay>🔄 로딩 중입니다...</LoadingOverlay>}
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

        <Button onClick={handleSubmit}>Prediction Start &gt;&gt;</Button>
        <Button2 onClick={handleexample}></Button2>
      </RightPanel>
    </Container>
  );
};

export default SimulatePage1;
