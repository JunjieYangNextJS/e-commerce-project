import React from "react";
import styled from "styled-components";
import { useLuxuriesTypes } from "../../contexts/LuxuriesContext";

function NavMenuExpanded({ expandNavMenu, directToPage }) {
  const luxuryTypes = useLuxuriesTypes();

  return (
    <MenuContainer expandNavMenu={expandNavMenu}>
      <MenuWrapper>
        {luxuryTypes.map((luxuryType) => (
          <MenuRoute onClick={() => directToPage(luxuryType)} key={luxuryType}>
            <MenuItem>{luxuryType}</MenuItem>
          </MenuRoute>
        ))}
        <MenuRoute onClick={() => directToPage("shopping-cart")}>
          <MenuItem>Shopping Cart</MenuItem>
        </MenuRoute>
      </MenuWrapper>
    </MenuContainer>
  );
}

export default NavMenuExpanded;

const MenuContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  top: 70px;
  left: -100%;
  height: calc(100vh - 70px);
  background-color: #fff;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.2)
  );
  z-index: 999;
  transition: all 0.5s ease;
  opacity: 1;

  @media all and (max-width: 728px) {
    left: ${({ expandNavMenu }) => (expandNavMenu ? "0" : "-100%")};
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  height: 80%;
  max-height: 600px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuRoute = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 22px;
  font-weight: bold;
  height: 20%;
  width: 100%;

  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const MenuItem = styled.div`
  ::first-letter {
    text-transform: uppercase;
  }
`;
