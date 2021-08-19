import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import router from "next/router";
import SearchIcon from "@material-ui/icons/Search";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { signIn, signOut, useSession } from "next-auth/client";
import SearchBox from "./../SearchBox";
import { useLuxuriesTypes } from "../../contexts/LuxuriesContext";
import { useCartItemsGetQuantity } from "../../contexts/CartItemsContext";

const NavbarWithSearch = ({ searchQuery, setSearchQuery }) => {
  // handle Login Session
  const [session] = useSession();

  // get an array of luxury Types to iterate over in <ProductsPageDropDownList>
  const luxuryTypes = useLuxuriesTypes();

  // a function to get the quantity of cartItems
  const getCartItemsQuantity = useCartItemsGetQuantity();

  // handle showing and folding productsPage dropdownlist(DDL) after hovering on <UserAccessSection>
  const [productsPageDDL, setProductsPageDDL] = useState(false);

  const showProductsPageDDL = () => {
    setProductsPageDDL(true);
  };

  const foldProductsPageDDL = () => {
    setProductsPageDDL(false);
  };

  // handle showing and folding account dropdownlist(DDL) after hovering on <UserAccessSection>
  const [accountDDL, setAccountDDL] = useState(false);

  const showAccountDDL = () => {
    setAccountDDL(true);
  };

  const foldAccountDDL = () => {
    setAccountDDL(false);
  };

  const directToPage = (page) => {
    router.push(`/${page}`);
  };

  const handleSearchQuery = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  };

  const handleSearchClick = () => {
    luxuryTypes.map((luxuryType) => {
      if (luxuryType.startsWith(searchQuery)) {
        directToPage(luxuryType);
      }
    });
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
        <NavToPagesWrapper>
          <NavToPagesSection
            onMouseEnter={showProductsPageDDL}
            onMouseLeave={foldProductsPageDDL}
          >
            <NavToPagesHead>Our Luxuries</NavToPagesHead>{" "}
            {productsPageDDL && (
              <NavToPagesBody>
                <ProductsPageDropDownList>
                  {luxuryTypes.map((luxuryType) => (
                    <ProductPageSection
                      key={luxuryType}
                      onClick={() => directToPage(luxuryType)}
                    >
                      {luxuryType}
                    </ProductPageSection>
                  ))}
                </ProductsPageDropDownList>
              </NavToPagesBody>
            )}
          </NavToPagesSection>
          <NavToPagesSection>
            <Link href="/about-us">
              <a>About Us</a>
            </Link>
          </NavToPagesSection>
        </NavToPagesWrapper>
        <SearchBarContainer>
          <SearchBox value={searchQuery} onChange={handleSearchQuery} />
          <SearchIconWrapper onClick={handleSearchClick}>
            <SearchIcon style={{ cursor: "pointer" }} />
          </SearchIconWrapper>
        </SearchBarContainer>

        <UserAccessWrapper>
          <UserAccessSection
            onMouseEnter={showAccountDDL}
            onMouseLeave={foldAccountDDL}
          >
            <UserAccessHead onClick={!session ? signIn : null}>
              {session ? `Hi, ${session.user.name}` : "Login"}
            </UserAccessHead>
            <UserAccessBody>
              {session && accountDDL && (
                <AccountDropDownList>
                  <AccountSection>
                    <Link href="/shopping-cart">
                      <a>Orders</a>
                    </Link>
                    <Link href="/about-us">
                      <a>Help</a>
                    </Link>
                  </AccountSection>
                  <SignOutSection onClick={signOut}>Sign Out</SignOutSection>
                </AccountDropDownList>
              )}
            </UserAccessBody>
          </UserAccessSection>
          {session && (
            <ShoppingBag onClick={() => directToPage("/shopping-cart")}>
              <LocalMallIcon style={{ fontSize: 28 }} />
              <ItemCount>{getCartItemsQuantity()}</ItemCount>
            </ShoppingBag>
          )}
        </UserAccessWrapper>
      </Nav>
    </>
  );
};

export default NavbarWithSearch;

const Nav = styled.nav`
  height: 70px;
  color: white;
  background: #95a5a6;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;

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

const NavToPagesWrapper = styled.ul`
  display: flex;
  width: 35%;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  gap: 60px;
  height: 70px;
  list-style: none;
`;

const NavToPagesSection = styled.li`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  font-size: 26px;
  position: relative;
  height: 70px;
  top: 20px;

  right: 5px;
  cursor: pointer;
`;

const NavToPagesHead = styled.div``;
const NavToPagesBody = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: auto;
  top: 50px;
`;

const ProductsPageDropDownList = styled.div`
  box-shadow: #a6a6a6 0 0 20px 5px;
  background-color: #2e3131;
  display: flex;
`;

const ProductPageSection = styled.div`
  padding: 20px 30px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  color: #eee;

  ::first-letter {
    text-transform: uppercase;
  }

  :hover {
    background-color: #555;
    border-bottom: 2px solid #febd69;
  }
`;

const UserAccessWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserAccessSection = styled.div`
  cursor: pointer;
  font-size: 25px;
  font-weight: bold;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70px;
  top: 20px;
  z-index: 999;
`;

const UserAccessHead = styled.div``;

const UserAccessBody = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 150px;
  top: 50px;
`;

const AccountDropDownList = styled.div`
  box-shadow: #a6a6a6 0 0 20px 5px;
  background-color: #2e3131;
`;

const AccountSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
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
  font-size: 19px;
  font-weight: 600;
  color: #eee;
  transition: all 0.2s ease-in-out;
  height: 60px;

  :hover {
    font-weight: 600;
    font-size: 20px;

    transition: all 0.2s ease-in-out;
  }
`;

const SearchBarContainer = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchIconWrapper = styled.div`
  height: 30px;
  width: 30px;
  margin-left: 5px;
  align-items: center;
  justify-content: center;
  background-color: #febd69;
`;

const ShoppingBag = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: 20px;
  top: 3px;
  gap: 2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    color: rgb(255, 215, 0);
    transition: all 0.2s ease-in-out;
  }
`;

const ItemCount = styled.div`
  font-size: 20px;
`;
