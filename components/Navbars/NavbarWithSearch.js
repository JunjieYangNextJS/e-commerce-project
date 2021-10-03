import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import disableScroll from "disable-scroll";
import SearchIcon from "@material-ui/icons/Search";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { signIn, signOut, useSession } from "next-auth/client";
import SearchBox from "./../SearchBox";
import NavMenuExpanded from "./NavMenuExpanded";
import { db } from "../../firebase";
import { useLuxuriesTypes } from "../../contexts/LuxuriesContext";

const NavbarWithSearch = ({ searchQuery, setSearchQuery }) => {
  // handle Login Session
  const [session] = useSession();

  // get an array of luxury Types to iterate over in <ProductsPageDropDownList>
  const luxuryTypes = useLuxuriesTypes();

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

  // handle expandNavMenu actions and redirecting to pages;
  const router = useRouter();

  const [expandNavMenu, setExpandNavMenu] = useState(false);

  const handleNavMenuExpanded = () => {
    window.scrollTo(0, 0);
    setExpandNavMenu(!expandNavMenu);
    !expandNavMenu ? disableScroll.on() : disableScroll.off();
  };

  const directToPage = (page) => {
    router.push(`/${page}`);
    disableScroll.off();
    if (`/${page}` === router.pathname) setExpandNavMenu(false);
  };

  const handleNavMenuOnResize = () => {
    if (window.innerWidth > 728) {
      setExpandNavMenu(false);
      disableScroll.off();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleNavMenuOnResize);
    return () => window.removeEventListener("resize", handleNavMenuOnResize);
  }, [expandNavMenu]);

  const [count, setCount] = useState(null);

  useEffect(() => {
    if (session) {
      db.collection("cartItems")
        .where("userEmail", "==", session.user.email)
        .onSnapshot((snapshot) => {
          let tempCartItems = [];
          tempCartItems = snapshot.docs.map((doc) => ({
            id: doc.id,
            product: doc.data(),
          }));
          let tempCount = 0;
          tempCartItems.forEach((cartItem) => {
            tempCount += cartItem.product.quantity;
          });

          setCount(tempCount);
        });
      return () => {
        setCount(null);
      };
    }
  }, [session]);
  // handle filtering items by name in this page and direct user to other page when click search icon
  const handleSearchQuery = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  };

  const handleSearchIcon = () => {
    luxuryTypes.map((luxuryType) => {
      if (luxuryType.startsWith(searchQuery.toLowerCase())) {
        directToPage(luxuryType);
      }
    });
  };

  return (
    <>
      <Nav>
        <Logo onClick={() => directToPage("")}>
          <p>Po</p>
          <StyledP>P</StyledP>
          <p>o</p>
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
          <SearchIconWrapper onClick={handleSearchIcon}>
            <SearchIcon style={{ cursor: "pointer" }} />
          </SearchIconWrapper>
        </SearchBarContainer>

        <UserAccessWrapper>
          <UserAccessSection
            onMouseEnter={showAccountDDL}
            onMouseLeave={foldAccountDDL}
          >
            <UserAccessHead
              onClick={!session ? signIn : null}
              session={session}
            >
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
            <ShoppingBag onClick={() => directToPage("shopping-cart")}>
              <LocalMallIcon />

              <ItemCount>{count}</ItemCount>
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

export default NavbarWithSearch;

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
  cursor: pointer;
  bottom: 3px;
  width: 10vw;
  font-size: 45px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

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
`;

const StyledP = styled.p`
  color: #febd69;
  font-weight: 600;
  text-shadow: -1px 0 #eee, 0 1px #eee, -1px 0 #eee, 0 1px #eee;
`;

const NavToPagesWrapper = styled.ul`
  display: flex;
  width: 35vw;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  gap: 60px;
  height: 70px;
  list-style: none;
  font-size: 26px;

  @media all and (max-width: 1330px) {
    width: 48vw;
  }

  @media all and (max-width: 1125px) {
    gap: 30px;
    font-size: 22px;
  }

  @media all and (max-width: 728px) {
    display: none;
  }
`;

const NavToPagesSection = styled.li`
  display: flex;
  justify-content: center;

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
  z-index: 30;
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
    margin-bottom: -2px;
  }

  @media all and (max-width: 1125px) {
    padding: 15px 15px;
    font-size: 16px;
  }
`;

const SearchBarContainer = styled.div`
  width: 35vw;
  display: flex;
  align-items: center;
  justify-content: center;

  @media all and (max-width: 1330px) {
    width: 20vw;
  }

  @media all and (max-width: 728px) {
    width: 30vw;
  }
`;

const SearchIconWrapper = styled.div`
  height: 30px;
  width: 30px;
  margin-left: 5px;
  align-items: center;
  justify-content: center;
  background-color: #febd69;
`;

const UserAccessWrapper = styled.div`
  width: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  @media all and (max-width: 1330px) {
    width: 27vw;
  }

  @media all and (max-width: 1125px) {
    width: 32vw;
    font-size: 17px;
  }

  @media all and (max-width: 728px) {
    font-size: 15px;
    width: 45vw;
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
  bottom: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  word-wrap: break-word;
  max-width: 200px;
  font-size: ${({ session }) => (!session ? "24px" : "inherit")};
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

  @media all and (max-width: 480px) {
    display: none;
  }
`;

const ItemCount = styled.div`
  display: flex;
  @media all and (max-width: 480px) {
    display: none;
  }
`;

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

  @media all and (max-width: 480px) {
    font-size: 12px;
  }
`;
