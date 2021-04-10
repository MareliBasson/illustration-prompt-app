import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Header = ({ pageHead }) => {
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

const menuItems = [
  {
    icon: "home",
    path: "/",
  },
  {
    icon: "cog",
    path: "/settings",
  },
];

const Menu = () => {
  return (
    <MenuWrapper className="menu">
      {menuItems.map((item) => (
        <MenuLink activeClassName="active" exact to={item.path}>
          <i className={`fa fa-${item.icon}`} />
        </MenuLink>
      ))}
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;
const MenuLink = styled(NavLink)`
  color: white;
  padding: 7px 15px;
  margin-left: 20px;
  font-weight: 300;
  font-size: 1rem;
  border-radius: 15px;

  &:hover,
  &:visited,
  &:active,
  &:focus {
    text-decoration: none;
    outline: none;
    color: white;
  }

  &:hover {
    text-decoration: none;
    color: #ff0000;
  }

  &:active,
  &.active {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
