import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  padding: 60px;
  background: white;
  height: 100vh;
  box-sizing: border-box;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  margin-top: -10px;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.button`
  padding: 10px 16px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background: ${({ active }) => (active ? "#000" : "#f2f2f2")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  cursor: pointer;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 14px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
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

const SimulatePage1 = () => {
  const location = useLocation();
  const patientID = location.state?.patientId;

  const [formData, setFormData] = useState({
    patientInfo: {
      id: "",
      age: "",
      gender: "",
      weight: "",
      height: "",
    },
    symptoms: [],
    areas: [],
    bodySigns: "",
    severity: "",
  });

  useEffect(() => {
    if (patientID) {
      axios
        .get(`/api/patient/${userId}`)
        .then((res) => {
          const data = res.data;
          setFormData((prev) => ({
            ...prev,
            patientInfo: {
              id: data.id,
              age: data.age,
              gender: data.gender,
              weight: data.weight,
              height: data.height,
            },
          }));
        })
        .catch((err) => console.error("Failed to load patient info:", err));
    }
  }, [patientID]);

  const toggle = (listName, value) => {
    setFormData((prev) => {
      const list = prev[listName];
      return {
        ...prev,
        [listName]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      };
    });
  };

  const handleNext = () => {
    navigate(`/SimulatePage_2/${formData.patientInfo.id}`, { state: formData });
  };

  return (
    <Container>
      <LeftPanel>
        <h1>남하원 환자의 진료 기록</h1>
        <pre>
          ID : {formData.patientInfo.id}
          나이 : {formData.patientInfo.age}
          성별 : {formData.patientInfo.gender}
          체중 : {formData.patientInfo.weight}키 : {formData.patientInfo.height}
        </pre>
      </LeftPanel>

      <RightPanel>
        <Title>현재 증상 및 감염 의심 정보를 입력해주세요.</Title>
        <Description>
          환자의 증상과 감염 위치를 선택하면, 보다 정확한 예후 예측이
          가능합니다.
        </Description>

        <div>
          <Label>증상 선택</Label>
          <TagGroup>
            {["발열", "오한", "기침", "설사", "배뇨통", "복통", "상처"].map(
              (s) => (
                <Tag
                  key={s}
                  active={formData.symptoms.includes(s)}
                  onClick={() => toggle("symptoms", s)}
                >
                  {s}
                </Tag>
              )
            )}
          </TagGroup>
          <SubText>Select symptoms (multiple choices)</SubText>
        </div>

        <div>
          <Label>감염 부위 추정</Label>
          <TagGroup>
            {["호흡기", "요로", "복강", "피부/연조직"].map((a) => (
              <Tag
                key={a}
                active={formData.areas.includes(a)}
                onClick={() => toggle("areas", a)}
              >
                {a}
              </Tag>
            ))}
          </TagGroup>
        </div>

        <div>
          <Label>생체징후</Label>
          <Input
            placeholder="Enter Body Signs"
            value={formData.bodySigns}
            onChange={(e) =>
              setFormData({ ...formData, bodySigns: e.target.value })
            }
          />
          <SubText>
            Enter vital signs: temperature, heart rate, respiratory rate, blood
            pressure, oxygen saturation
          </SubText>
        </div>

        <div>
          <Label>중증도 평가 도구</Label>
          <Row>
            {["NEWS2", "qSOFA"].map((s) => (
              <Tag
                key={s}
                active={formData.severity === s}
                onClick={() => setFormData({ ...formData, severity: s })}
              >
                {s}
              </Tag>
            ))}
          </Row>
          <SubText>Option to skip input if unsure</SubText>
        </div>

        <Button onClick={handleNext}>Next</Button>
      </RightPanel>
    </Container>
  );
};

export default SimulatePage1;
