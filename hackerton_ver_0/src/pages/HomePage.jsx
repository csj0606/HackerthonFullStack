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
  width: 250px;
`;

const Title = styled.h1`
  inline-size: 800px;
  overflow-wrap: break-word;
  font-size: 50px;
  margin-bottom: 20px;
  font-style: bold;
`;

const Subtitle = styled.h2`
  font-size: 20px;
  font-style: bold;
  margin-bottom: 20px;
`;

const Buttonwrapper = styled.div`
  display: flex;
  gap: 20px;
  button {
    width: 200px;
    height: 40px;
    background-color: rgb(255, 255, 255);
    color: black;
    border-radius: 10px;
    border: none;
    font-size: 15px;
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
        <button onClick={() => navigate("/checkInfo")}>
          기존 환자 불러오기
        </button>
        <button onClick={() => navigate("/createNew/Info")}>
          새 환자 등록하기
        </button>
      </Buttonwrapper>
    </Wrapper>
  );
};

export default HomePage;
