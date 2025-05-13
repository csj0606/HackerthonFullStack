import Fosfomycin from "../assets/Fosfomycin.png";
import Nitrofuration from "../assets/Nitrofuration.png";
import AMIKACIN500 from "../assets/AMIKACIN500.jpg";
import meropenem from "../assets/meropenem.jpg";
import graph from "../assets/graph.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 60px;
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  gap: 40px;
  background: linear-gradient(to bottom, rgb(255, 255, 255), #acd6d5);
`;

const LeftPanel = styled.div`
  width: 80%;
  margin-top: 10%;
  text-align: center;
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: bold;
`;

const SubTitle = styled.p`
  font-size: 20px;
  margin-bottom: 40px;
`;

const CardGroup = styled.div`
  margin-left: 10%;
  display: flex;
  width: 80%;
  gap: 90px;
`;

const Card = styled.div`
  flex: 1;
  width: 70%;
  background: #f2f2f2;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ccc;
`;

const CardHeader = styled.div`
  background: rgb(202, 253, 255);
  padding: 6px 12px;
  font-size: 20px;
  font-weight: bold;
`;

const CardImage = styled.img`
  object-fit: cover;
  width: 60%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background: rgb(255, 255, 255);
`;

const CardFooter = styled.div`
  padding: 20px;
  background: rgb(202, 253, 255);
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Highlight = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 4px;
  color: black;
`;

const RightPanel = styled.div`
  margin-right: 4%;
  margin-top: 10%;
  height: 72%;
  width: 100%;
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 16px;
  padding: 20px;
  border-radius: 8px;
`;

const Graphimage = styled.img`
  width: 700px;
  height: 100%;
`;

const OutputPage = () => {
  return (
    <Container>
      <LeftPanel>
        <Title>AI 추천 항생제</Title>
        <SubTitle>AI가 추천한 최적의 항생제를 확인하세요</SubTitle>

        <CardGroup>
          <Card>
            <CardHeader>최적</CardHeader>
            <CardImage src={AMIKACIN500} alt="항생제 A" />
            <CardFooter>
              AMIKACIN500<Highlight>AI 추천</Highlight>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>차선</CardHeader>
            <CardImage src={meropenem} alt="항생제 B" />
            <CardFooter>
              meropenem<Highlight>AI 추천</Highlight>
            </CardFooter>
          </Card>
        </CardGroup>
      </LeftPanel>

      <RightPanel>
        <Graphimage src={graph} alt="그래프" />
      </RightPanel>
    </Container>
  );
};

export default OutputPage;
