import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  text-align: left;
  margin-top: 20px;
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

const ButtonSelect = styled.button`
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  background-color: ${({ active }) => (active ? "#000" : "#f9f9f9")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  border-radius: 8px;
  cursor: pointer;
`;

const TagGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.button`
  width: fit-content;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: ${({ active }) => (active ? "#000" : "#f2f2f2")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
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

// 선택지 정의
const ageOptions = [
  "0~9세",
  "10~19세",
  "20~29세",
  "30~39세",
  "40~49세",
  "50~59세",
  "60~69세",
  "70세이상",
];

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

const diseaseOptions = [
  "선천성 요로계 기형",
  "요로결석",
  "전립선 질환",
  "신장 질환",
  "당뇨",
  "면역결핍",
  "배뇨장애",
];

const PatientForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    patientId: "",
    age: "",
    gender: "",
    diseases: [],
    hospitalized: "",
    medications: "",
    rescentantibiotics: [],
  });

  useEffect(() => {
    if (location.state) {
      setFormData(location.state); // 기존 값 복원
    }
  }, [location.state]);

  const toggleDisease = (name) => {
    setFormData((prev) => ({
      ...prev,
      diseases: prev.diseases.includes(name)
        ? prev.diseases.filter((d) => d !== name)
        : [...prev.diseases, name],
    }));
  };

  const handleNext = () => {
    navigate("/createNew/antibiotics", {
      state: {
        ...location.state,
        ...formData,
      },
    });
    console.log("제출 데이터:", {
      ...location.state,
      ...formData,
    });
  };

  return (
    <Container>
      <LeftSection>
        <h1>환자의 기본 정보를 입력해주세요.</h1>
        <p>
          환자의 나이, 병력, 항생제 이력을 통해 내성 위험까지 고려한 결과를
          제공합니다.
        </p>
      </LeftSection>

      <RightSection>
        <div>
          <Label>환자 ID (또는 익명화 ID)</Label>
          <Input
            placeholder="Enter Patient ID"
            value={formData.patientId}
            onChange={(e) =>
              setFormData({ ...formData, patientId: e.target.value })
            }
          />
          <SubText>EMR 연동 또는 자체 생성</SubText>
        </div>

        <div>
          <Label>나이</Label>
          <TagGroup>
            {ageOptions.map((age) => (
              <Tag
                key={age}
                active={formData.age === age}
                onClick={() => setFormData({ ...formData, age })}
              >
                {age}
              </Tag>
            ))}
          </TagGroup>
          <SubText>Basic personal information</SubText>
        </div>

        <div>
          <Label>성별</Label>
          <Row>
            <ButtonSelect
              active={formData.gender === "남"}
              onClick={() => setFormData({ ...formData, gender: "남" })}
            >
              남
            </ButtonSelect>
            <ButtonSelect
              active={formData.gender === "여"}
              onClick={() => setFormData({ ...formData, gender: "여" })}
            >
              여
            </ButtonSelect>
          </Row>
        </div>

        <div>
          <Label>기저질환 체크박스</Label>
          <TagGroup>
            {diseaseOptions.map((item) => (
              <Tag
                key={item}
                active={formData.diseases.includes(item)}
                onClick={() => toggleDisease(item)}
              >
                {item}
              </Tag>
            ))}
          </TagGroup>
          <SubText>Select existing conditions</SubText>
        </div>

        <div>
          <Label>최근 3개월 입원 여부</Label>
          <Row>
            <ButtonSelect
              active={formData.hospitalized === "yes"}
              onClick={() => setFormData({ ...formData, hospitalized: "yes" })}
            >
              Yes
            </ButtonSelect>
            <ButtonSelect
              active={formData.hospitalized === "no"}
              onClick={() => setFormData({ ...formData, hospitalized: "no" })}
            >
              No
            </ButtonSelect>
          </Row>
        </div>

        <div>
          <Label>현재 복용중인 약</Label>
          <Input
            placeholder="Enter current medications"
            value={formData.medications}
            onChange={(e) =>
              setFormData({ ...formData, medications: e.target.value })
            }
          />
          <SubText>Basic personal information</SubText>
        </div>

        <div>
          <Label>최근 3개월 처방된 항생제</Label>
          <Input
            placeholder="ex)Amoxicillin, Doxycycline"
            value={formData.rescentantibiotics}
            onChange={(e) =>
              setFormData({
                ...formData,
                rescentantibiotics: e.target.value,
              })
            }
          />
          <SubText>Basic personal information</SubText>
        </div>

        <SubmitButton onClick={handleNext}>Next</SubmitButton>
      </RightSection>
    </Container>
  );
};

export default PatientForm;
