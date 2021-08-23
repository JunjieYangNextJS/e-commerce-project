import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import router from "next/router";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import NavMenuExpanded from "./NavMenuExpanded";
import { signIn, signOut, useSession } from "next-auth/client";
import { useLuxuriesTypes } from "../../contexts/LuxuriesContext";
import { useCartItemsGetQuantity } from "../../contexts/CartItemsContext";

const Navbar = () => {
  // handle Login Session
  const [session] = useSession();

  // get an array of luxury Types to iterate over in <ProductsPageDropDownList>
  const luxuryTypes = useLuxuriesTypes();

  // a function to get the quantity of cartItems
  const getCartItemsQuantity = useCartItemsGetQuantity();

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

  const [expandNavMenu, setExpandNavMenu] = useState(false);

  const handleNavMenuExpanded = () => {
    setExpandNavMenu(!expandNavMenu);
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

        <NavToProductPagesSection>
          {luxuryTypes.map((luxuryType) => (
            <ProductPageSection
              key={luxuryType}
              onClick={() => directToPage(luxuryType)}
            >
              {luxuryType}
            </ProductPageSection>
          ))}
        </NavToProductPagesSection>
        <NavToOtherPagesSection>
          <Link href="/about-us">
            <a>About Us</a>
          </Link>
        </NavToOtherPagesSection>

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
            <ShoppingBag onClick={() => router.push("/shopping-cart")}>
              <LocalMallIcon style={{ fontSize: 28 }} />
              <ItemCount>{getCartItemsQuantity()}</ItemCount>
            </ShoppingBag>
          )}
        </UserAccessWrapper>
        <MenuIconWrapper onClick={handleNavMenuExpanded}>
          {!expandNavMenu ? (
            <MenuIcon style={{ fontSize: 31 }} />
          ) : (
            <CloseIcon style={{ fontSize: 31 }} />
          )}
        </MenuIconWrapper>

        <NavMenuExpanded
          router={router}
          directToPage={directToPage}
          expandNavMenu={expandNavMenu}
        />
      </Nav>
    </>
  );
};

export default Navbar;

const Nav = styled.nav`
  height: 70px;
  color: white;
  background: #95a5a6;
  display: flex;
  position: relative;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 3px;
  width: 10vw;
  font-size: 45px;

  @media all and (max-width: 1500px) {
    width: 15vw;
  }

  @media all and (max-width: 1125px) {
    font-size: 32px;
  }

  @media all and (max-width: 728px) {
    width: 22vw;
    font-size: 30px;
  }

  a {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    font-weight: 600;
    display: flex;
  }
`;

// const Logo = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 10%;

//   a {
//     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
//       Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
//     font-size: 45px;
//     font-weight: 600;
//     display: flex;
//   }
// `;

const StyledP = styled.p`
  color: #febd69;
  font-weight: 600;
  text-shadow: -1px 0 #eee, 0 1px #eee, -1px 0 #eee, 0 1px #eee;
`;

const NavToProductPagesSection = styled.div`
  display: flex;
  align-items: center;
  width: 50vw;
  justify-content: center;
  font-size: 26px;
  font-weight: 600;
  position: relative;
  cursor: pointer;

  @media all and (max-width: 728px) {
    display: none;
  }
`;

const NavToOtherPagesSection = styled.div`
  width: 15vw;
  display: flex;
  align-items: center;
  height: 70px;
  justify-content: center;
  font-size: 26px;
  font-weight: 600;
  cursor: pointer;

  @media all and (max-width: 1500px) {
    font-size: 22px;
  }

  @media all and (max-width: 1125px) {
    font-size: 18px;
    font-weight: normal;
  }

  @media all and (max-width: 728px) {
    display: none;
  }
`;

const ProductPageSection = styled.div`
  padding: 20px 2.1vw;
  cursor: pointer;
  color: white;

  ::first-letter {
    text-transform: uppercase;
  }

  :hover {
    background-color: #6e6e6e;
    border-bottom: 2px solid #febd69;
    margin-bottom: -2px;
    z-index: 2;
  }

  @media all and (max-width: 1500px) {
    font-size: 22px;
  }

  @media all and (max-width: 1125px) {
    font-size: 18px;
    font-weight: normal;
    padding: 20px 1.6vw;
  }
`;

const UserAccessWrapper = styled.div`
  width: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  @media all and (max-width: 1125px) {
    width: 32vw;
    font-size: 17px;
  }

  @media all and (max-width: 728px) {
    width: 45vw;
    position: absolute;
    right: 31px;
  }
`;

const UserAccessSection = styled.div`
  cursor: pointer;
  font-weight: bold;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70px;
  top: 20px;
  z-index: 10;
`;

const UserAccessHead = styled.div`
  position: relative;
  top: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  word-wrap: break-word;
  max-width: 200px;
  @media all and (max-width: 1125px) {
    top: 3px;
  }
`;

const UserAccessBody = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
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
  width: 150px;
  font-size: 20px;
  font-weight: 600;
  color: #eee;
  a {
    :hover {
      font-weight: 600;
      border-bottom: 2px solid #febd69;
      margin-bottom: -2px;
    }
  }

  @media all and (max-width: 1125px) {
    padding-top: 15px;
    padding-bottom: 25px;
    gap: 12px;
    font-size: 16px;
    width: 100px;
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

  @media all and (max-width: 1125px) {
    font-size: 17px;
    height: 40px;
    :hover {
      font-weight: 600;
      font-size: 18px;
      transition: all 0.2s ease-in-out;
    }
  }
`;

const ShoppingBag = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;
  position: relative;
  left: 20px;
  gap: 2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    color: rgb(255, 215, 0);
    transition: all 0.2s ease-in-out;
  }

  @media all and (max-width: 1125px) {
    left: 5px;
    font-size: 16px;
  }
`;

const ItemCount = styled.div``;

const MenuIconWrapper = styled.div`
  position: absolute;
  display: none;
  right: 3px;
  cursor: pointer;

  :hover {
    color: #2b2b2b;
  }

  @media all and (max-width: 728px) {
    display: flex;
  }
`;

// const UserAccessWrapper = styled.div`
//   width: 20%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const UserAccessSection = styled.div`
//   cursor: pointer;
//   font-size: 25px;
//   font-weight: bold;
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   height: 70px;
//   top: 20px;
//   z-index: 999;
// `;

// const UserAccessHead = styled.div``;

// const UserAccessBody = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: absolute;
//   width: 150px;
//   top: 50px;
// `;

// const AccountDropDownList = styled.div`
//   box-shadow: #a6a6a6 0 0 20px 5px;
//   background-color: #2e3131;
// `;

// const AccountSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 24px;
//   padding-top: 30px;
//   padding-bottom: 50px;

//   a {
//     font-size: 20px;
//     font-weight: 600;
//     color: #eee;

//     :hover {
//       font-weight: 600;
//       border-bottom: 2px solid #febd69;
//       margin-bottom: -2px;
//     }
//   }
// `;

// const SignOutSection = styled.div`
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   font-size: 19px;
//   font-weight: 600;
//   color: #eee;
//   transition: all 0.2s ease-in-out;
//   height: 60px;

//   :hover {
//     font-weight: 600;
//     font-size: 20px;

//     transition: all 0.2s ease-in-out;
//   }
// `;

// const ShoppingBag = styled.div`
//   display: flex;
//   align-items: center;
//   position: relative;
//   left: 20px;
//   top: 3px;
//   gap: 2px;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
//   :hover {
//     color: rgb(255, 215, 0);
//     transition: all 0.2s ease-in-out;
//   }
// `;

// const ItemCount = styled.div`
//   font-size: 20px;
// `;
