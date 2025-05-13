import styled from "styled-components";
import logo from "../assets/mainlogo.png";
import { useNavigate } from "react-router-dom";
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

const Logo = styled.img`
  width: 320px;
`;

const Title = styled.h1`
  inline-size: 800px;
  overflow-wrap: break-word;
  font-size: 60px;
  margin-bottom: 10px;
  font-style: bold;
  font-family: "Lilita One", sans-serif;
`;

const Subtitle = styled.h2`
  font-size: 30px;
  font-style: bold;
  margin-bottom: 20px;
`;

const Buttonwrapper = styled.div`
  display: flex;
  gap: 20px;
  button {
    margin-top: 20px;
    width: 400px;
    height: 60px;
    background-color: rgb(255, 255, 255);
    color: black;
    border-radius: 10px;
    border: none;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 3px 5px rgb(0, 0, 0, 0.25);
    &:hover {
      background-color: rgb(230, 230, 230);
      color: black;
    }
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Logo src={logo} alt="Logo" />
      <Title>환자에게 가장 나은 선택을, CureMap이 함께합니다.</Title>
      <Subtitle>
        각 항생제의 예후를 비교하고, 근거 있는 선택을 시작하세요.
      </Subtitle>
      <Buttonwrapper>
        <button onClick={() => navigate("/createNew/Info")}>
          항생제 시뮬레이터 시작하기
        </button>
      </Buttonwrapper>
    </Wrapper>
  );
};

export default HomePage;
