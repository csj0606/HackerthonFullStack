import { Link } from "react-router-dom";
import logo from "../assets/mainlogo.png";
import styled from "styled-components";

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: rgb(253, 253, 253);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0px;
  z-index: 1000;
  box-shadow: 0px 1px 5px rgb(0, 0, 0, 0.25);
`;

const StyledLogo = styled.img`
  font-size: 30px;
  margin-top: 20px;
  margin-left: 20px;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-left: 10px;
  color: black;
  float: right;
  color: #098283;
`;

const StyledLink = styled(Link)`
  font-family: Century Gothic, sans-serif;
  color: black;
  text-decoration: none;
  font-size: 20px;
  margin-right: 30px;
  &:hover {
    color: #098283;
  }
`;

const Navbar = () => {
  return (
    <NavBar>
      <Link to={"/"}>
        <StyledLogo src={logo}></StyledLogo>
        <Title>CureMap</Title>
      </Link>
      <div>
        <StyledLink to="/SignIn">마이페이지</StyledLink>
        <StyledLink to="/checkInfo">환자조회</StyledLink>
        <StyledLink to="/createNew/Info">환자정보입력</StyledLink>
        <StyledLink to="/SignIn">검사결과</StyledLink>
      </div>
    </NavBar>
  );
};

export default Navbar;
