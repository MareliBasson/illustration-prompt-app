import React from "react";
import styled from "styled-components";
import Menu from "components/menu";

const Header = ({ pageHead }) => {
  return (
    <HeaderWrapper>
      <div className="container">
        <HeaderContainer>
          <Title>{pageHead}</Title>
          <Menu />
        </HeaderContainer>
      </div>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  flex: 0;
  color: white;
`;
const HeaderContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 30px;
  }
`;
const Title = styled.div`
  height: 60px;
  padding-right: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default Header;
