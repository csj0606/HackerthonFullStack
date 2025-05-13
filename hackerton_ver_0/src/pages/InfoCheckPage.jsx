import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 60px);
  background: linear-gradient(to bottom, rgb(255, 255, 255), #acd6d5);
`;

const Title = styled.h1`
  color: black;
  font-size: 36px;
  margin-bottom: 40px;
`;

const IdGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 400px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 5px;
`;

const SubText = styled.span`
  font-size: 12px;
  color: gray;
  margin-bottom: 10px;
`;

const Button = styled.button`
  margin-top: 20px;
  width: 400px;
  padding: 15px;
  background-color: black;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const InfoCheckPage = () => {
  const [patientId, setPatientId] = useState("");

  const handleSearch = () => {
    // 여기가 핵심! input 값 사용 가능
    console.log("환자 ID:", patientId);

    // 외부 모듈로 내보내고 싶다면 여기에 콜백 또는 상태 리프팅 활용
    // 예: props.onSubmit({ id: patientId, name: patientName })
  };

  return (
    <Wrapper>
      <Title>기존 환자 진료 내역 조회</Title>

      <IdGroup>
        <Label>환자 ID</Label>
        <Input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <SubText>EMR 연동 또는 자체 생성</SubText>
      </IdGroup>

      <Button onClick={handleSearch}>Search</Button>
    </Wrapper>
  );
};

export default InfoCheckPage;
