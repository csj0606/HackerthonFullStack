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

const AntibioticForm_1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [basicInfo, setBasicInfo] = useState({});
  const [antibioticInfo, setAntibioticInfo] = useState({
    pulse_rate: "",
    breathing: "",
    temperature: "",
    SBP: "",
    DBP: "",
  });

  useEffect(() => {
    if (location.state) {
      const { pulse_rate, breathing, temperature, SBP, DBP, ...basic } =
        location.state;

      // 항목이 있으면 antibioticInfo로, 나머지는 basicInfo로
      setAntibioticInfo((prev) => ({
        pulse_rate: pulse_rate ?? prev.pulse_rate,
        breathing: breathing ?? prev.breathing,
        temperature: temperature ?? prev.temperature,
        SBP: SBP ?? prev.SBP,
        DBP: DBP ?? prev.DBP,
      }));

      setBasicInfo(basic);
    }
  }, [location.state]);

  const handleSubmit = () => {
    console.log("제출 데이터:", basicInfo, antibioticInfo);

    navigate(`/createNew/test_result`, {
      state: { ...basicInfo, antibioticInfo },
    });
  };

  const handleBack = () => {
    navigate("/createNew/Info", {
      state: { ...basicInfo, antibioticInfo },
    });
  };

  return (
    <Container>
      <LeftSection>
        <h1>항생제 사용 이력을 입력해주세요.</h1>
        <p>
          현재 복용 중인 항생제와 이력을 통해 내성 위험까지 고려한 결과를
          제공합니다.
        </p>
      </LeftSection>

      <RightSection>
        <div>
          <Label>맥박</Label>
          <Input
            placeholder="Enter pulse rate"
            value={antibioticInfo.pulse_rate}
            onChange={(e) =>
              setAntibioticInfo({
                ...antibioticInfo,
                pulse_rate: e.target.value,
              })
            }
          />
          <SubText>Include start date</SubText>
        </div>

        <div>
          <Label>호흡</Label>
          <Input
            placeholder="Enter breathing rate"
            value={antibioticInfo.breathing}
            onChange={(e) =>
              setAntibioticInfo({
                ...antibioticInfo,
                breathing: e.target.value,
              })
            }
          />
          <SubText>Include medication, duration, frequency</SubText>
        </div>

        <div>
          <Label>체온</Label>
          <Input
            placeholder="Enter temperature"
            value={antibioticInfo.temperature}
            onChange={(e) =>
              setAntibioticInfo({
                ...antibioticInfo,
                temperature: e.target.value,
              })
            }
          />
          <SubText>Include medication, duration, frequency</SubText>
        </div>

        <div>
          <Label>SBP</Label>
          <Input
            placeholder="Enter SBP"
            value={antibioticInfo.SBP}
            onChange={(e) =>
              setAntibioticInfo({ ...antibioticInfo, SBP: e.target.value })
            }
          />
          <SubText>Include medication, duration, frequency</SubText>
        </div>

        <div>
          <Label>DBP</Label>
          <Input
            placeholder="Enter DBP"
            value={antibioticInfo.DBP}
            onChange={(e) =>
              setAntibioticInfo({ ...antibioticInfo, DBP: e.target.value })
            }
          />
          <SubText>Include medication, duration, frequency</SubText>
        </div>

        <SubmitButton onClick={handleSubmit}>Next</SubmitButton>
        <BackButton onClick={handleBack}>← Back</BackButton>
      </RightSection>
    </Container>
  );
};

export default AntibioticForm_1;
