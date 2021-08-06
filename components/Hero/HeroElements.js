import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import router, { useRouter } from "next/router";
import ProductFeed from "./ProductFeed";
import { signIn, signOut, useSession } from "next-auth/client";
import { ProductsDropDownList, ProductsDDLSection } from "../Navbar";

const HeroElements = ({ products, luxuries }) => {
  const [session] = useSession();

  const [clickForMore, setClickForMore] = useState(false);

  const toggleClickForMore = () => {
    setClickForMore(!clickForMore);
  };

  const directToPage = (page) => {
    router.push(page);
  };

  console.log(products);
  console.log(luxuries);

  return (
    <HeroContainer>
      {clickForMore && (
        <ProductsDropDownList>
          <ProductsDDLSection onClick={() => directToPage("/rings")}>
            Rings
          </ProductsDDLSection>
          <ProductsDDLSection onClick={() => directToPage("/necklace")}>
            Necklace
          </ProductsDDLSection>
          <ProductsDDLSection onClick={() => directToPage("/bracelet")}>
            Bracelet
          </ProductsDDLSection>
          <ProductsDDLSection onClick={() => directToPage("/earrings")}>
            Earrings
          </ProductsDDLSection>
        </ProductsDropDownList>
      )}
      <ImageWrapperOne>
        <Image
          src={`https://images.unsplash.com/photo-1558882268-15aa056d885f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80`}
          width={634}
          height={951}
        />
      </ImageWrapperOne>
      <HeroSection>
        <HeroTitle>Our Signature Luxuries</HeroTitle>
        <HeroNavToProducts onClick={!session ? signIn : toggleClickForMore}>
          Click For More
        </HeroNavToProducts>
        <ProductFeed products={products} />
      </HeroSection>

      <ImageWrapperTwo>
        <Image
          src={`https://images.unsplash.com/photo-1611652022451-d55126758521?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=642&q=80`}
          width={634}
          height={951}
        />
      </ImageWrapperTwo>
    </HeroContainer>
  );
};

export default HeroElements;

const HeroContainer = styled.div`
  height: 951px;
  max-width: 100%;
  overflow: hidden;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1));
  z-index: -1;
  display: flex;
  justify-content: space-between;
`;

const ImageWrapperOne = styled.div`
  opacity: 80%;
  margin-left: -100px;
`;

const ImageWrapperTwo = styled.div`
  opacity: 90%;

  margin-right: -100px;
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroTitle = styled.h1`
  cursor: default;
  text-align: center;
  color: #ffd700;
  font-size: 36px;
  text-shadow: 3px 3px gray;
`;

const HeroNavToProducts = styled.p`
  text-align: center;
  margin-top: -20px;
  text-decoration: underline;
  cursor: pointer;
  font-size: 19px;
  font-weight: 600;
  opacity: 60%;

  &:active {
    color: #ffd700;
  }
`;
