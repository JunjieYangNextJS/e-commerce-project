import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import router, { useRouter } from "next/router";
import SearchIcon from "@material-ui/icons/Search";
import { signIn, signOut, useSession } from "next-auth/client";
import {
  useAccount,
  useAccountShow,
  useAccountFold,
} from "../contexts/AccountContext";
import {
  useProductsDDL,
  useProductsDDLShow,
  useProductsDDLFold,
} from "../contexts/ProductsDDLContext";

const Navbar = () => {
  // handle Login Session
  const [session] = useSession();

  // useContext for showing/folding account info
  const account = useAccount();
  const showAccount = useAccountShow();
  const foldAccount = useAccountFold();

  // useContext for showing/folding productsDDL info
  const productsDDL = useProductsDDL();
  const showProductsDDL = useProductsDDLShow();
  const foldProductsDDL = useProductsDDLFold();

  const directToPage = (page) => {
    router.push(page);
  };

  return (
    <>
      <Nav>
        <Logo>
          <Link href="/">
            <a>
              <p>Po</p>
              <StyledP>P</StyledP>
              <p>o</p>
            </a>
          </Link>
        </Logo>
        <NavigatorSection>
          <NavToProducts
            onMouseEnter={showProductsDDL}
            onMouseLeave={foldProductsDDL}
          >
            Our Luxuries
          </NavToProducts>
          <Link href="/about-us">
            <a>About Us</a>
          </Link>
        </NavigatorSection>
        <SearchBarContainer>
          <SearchBar type="text" />
          <SearchIconWrapper>
            <SearchIcon style={{ cursor: "pointer" }} />
          </SearchIconWrapper>
        </SearchBarContainer>
        <LoginLinkWrapper>
          <LoginLink
            onClick={!session ? signIn : null}
            onMouseEnter={showAccount}
            onMouseLeave={foldAccount}
          >
            <p>{session ? `Hi, ${session.user.name}` : "Login"}</p>
          </LoginLink>
        </LoginLinkWrapper>
      </Nav>
      {productsDDL && (
        <ProductsDropDownList
          onMouseEnter={showProductsDDL}
          onMouseLeave={foldProductsDDL}
        >
          <ProductsDDLSection
            onClick={() => {
              !session ? signIn() : directToPage("/rings");
            }}
          >
            Rings
          </ProductsDDLSection>
          <ProductsDDLSection
            onClick={() => {
              !session ? signIn() : directToPage("/necklace");
            }}
          >
            Necklace
          </ProductsDDLSection>
          <ProductsDDLSection
            onClick={() => {
              !session ? signIn() : directToPage("/bracelet");
            }}
          >
            Bracelet
          </ProductsDDLSection>
          <ProductsDDLSection
            onClick={() => {
              !session ? signIn() : directToPage("/earrings");
            }}
          >
            Earrings
          </ProductsDDLSection>
        </ProductsDropDownList>
      )}
      {session && account && (
        <AccountDropDownList
          onMouseEnter={showAccount}
          onMouseLeave={foldAccount}
        >
          <AccountSection>
            <Link href="/account">
              <a>Account</a>
            </Link>
            <Link href="/checkout">
              <a>Orders</a>
            </Link>
            <Link href="/about-us">
              <a>Help</a>
            </Link>
          </AccountSection>
          <SignOutSection onClick={signOut}>Sign Out</SignOutSection>
        </AccountDropDownList>
      )}
    </>
  );
};

export default Navbar;

const Nav = styled.nav`
  height: 70px;
  width: 100% auto;
  color: white;
  background: #95a5a6;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  width: 150px;
  margin-left: 20px;

  a {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 45px;
    font-weight: 600;
    display: flex;
  }
`;

const StyledP = styled.p`
  color: #febd69;
  font-weight: 600;
  text-shadow: -1px 0 #eee, 0 1px #eee, -1px 0 #eee, 0 1px #eee;
`;

const NavigatorSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 70px;
  margin-left: 170px;

  a {
    font-size: 25px;
    padding-top: 18px;
    :hover {
      margin-bottom: -2px;
      border-bottom: 2px solid #febd69;
    }
  }
`;

const NavToProducts = styled.div`
  font-size: 25px;
  height: 60px;

  padding-top: 18px;
  cursor: pointer;

  :hover {
    border-bottom: 2px solid #febd69;
  }
`;

const SearchBarContainer = styled.div`
  width: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 180px;
`;

const SearchBar = styled.input`
  width: 600px;
  height: 30px;
  border: none;
  outline: none;
`;

const SearchIconWrapper = styled.div`
  height: 30px;
  width: 30px;
  margin-left: 5px;
  align-items: center;
  justify-content: center;
  background-color: #febd69;
`;

const LoginLinkWrapper = styled.div`
  background-color: transparent;
  height: 60px;
  width: 150px;
  margin-left: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s ease-in-out;

  p {
    font-size: 30px;
    font-weight: 600;
    cursor: pointer;
  }

  :hover {
    box-shadow: 0 0 2px 2px;
    transition: all 0.1s ease-in-out;
  }
`;

const LoginLink = styled.div``;

export const ProductsDropDownList = styled.div`
  position: absolute;
  display: flex;
  height: 60px;
  width: 600px;
  margin-left: 120px;
  background-color: #2e3131;
  border: 2px solid white;
  justify-content: space-evenly;
  z-index: 999;
`;

export const ProductsDDLSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 10px 10px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  color: #eee;
  z-index: 999;

  :hover {
    font-weight: 600;
    border-bottom: 2px solid #febd69;
    margin-bottom: -2px;
  }
`;

const AccountDropDownList = styled.div`
  position: absolute;
  z-index: 2;
  height: 300px;
  width: 150px;
  margin-left: 1668px;
  background-color: #2e3131;
  border: 2px solid white;
`;

const AccountSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding-top: 30px;
  padding-bottom: 50px;

  a {
    font-size: 20px;
    font-weight: 600;
    color: #eee;

    :hover {
      font-weight: 600;
      border-bottom: 2px solid #febd69;
      margin-bottom: -2px;
    }
  }
`;

const SignOutSection = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-size: 17px;
  font-weight: 600;
  color: #eee;
  transition: all 0.2s ease-in-out;

  :hover {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: -2px;
    transition: all 0.2s ease-in-out;
  }
`;
