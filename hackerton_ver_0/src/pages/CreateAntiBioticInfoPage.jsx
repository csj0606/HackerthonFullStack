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
    width: 400px;
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
  background: rgb(240, 240, 240);
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
    console.log("현재 데이터:", basicInfo, antibioticInfo);
    navigate(`/createNew/test_result`, {
      state: { ...basicInfo, ...antibioticInfo },
    });
  };

  const handleBack = () => {
    navigate("/createNew/Info", {
      state: { ...basicInfo, ...antibioticInfo },
    });
  };

  return (
    <Container>
      <LeftSection>
        <h1>환자의 생징후 정보를 입력해주세요.</h1>
        <p>
          환자의 맥박, 호흡, 체온, SBP, DBP 정보를 고려한 결과를 제공합니다.
        </p>
      </LeftSection>

      <RightSection>
        <div>
          <Label>맥박</Label>
          <Input
            placeholder="ex) 70.1"
            value={antibioticInfo.pulse_rate}
            onChange={(e) =>
              setAntibioticInfo({
                ...antibioticInfo,
                pulse_rate: e.target.value,
              })
            }
          />
          <SubText>Enter pulse rate</SubText>
        </div>

        <div>
          <Label>호흡</Label>
          <Input
            placeholder="ex)20.0"
            value={antibioticInfo.breathing}
            onChange={(e) =>
              setAntibioticInfo({
                ...antibioticInfo,
                breathing: e.target.value,
              })
            }
          />
          <SubText>Enter breathing rate</SubText>
        </div>

        <div>
          <Label>체온</Label>
          <Input
            placeholder="ex)36.2"
            value={antibioticInfo.temperature}
            onChange={(e) =>
              setAntibioticInfo({
                ...antibioticInfo,
                temperature: e.target.value,
              })
            }
          />
          <SubText>Enter temperature</SubText>
        </div>

        <div>
          <Label>SBP</Label>
          <Input
            placeholder="ex)117.0"
            value={antibioticInfo.SBP}
            onChange={(e) =>
              setAntibioticInfo({ ...antibioticInfo, SBP: e.target.value })
            }
          />
          <SubText>Enter SBP</SubText>
        </div>

        <div>
          <Label>DBP</Label>
          <Input
            placeholder="ex)74.0"
            value={antibioticInfo.DBP}
            onChange={(e) =>
              setAntibioticInfo({ ...antibioticInfo, DBP: e.target.value })
            }
          />
          <SubText>Enter DBP</SubText>
        </div>
        <div>
          <SubmitButton onClick={handleSubmit}>Next</SubmitButton>
          <BackButton onClick={handleBack}>← Back</BackButton>
        </div>
      </RightSection>
    </Container>
  );
};

export default AntibioticForm_1;
