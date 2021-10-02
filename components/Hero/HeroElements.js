import React from "react";
import Image from "next/image";
import styled from "styled-components";
import ProductFeed from "./ProductFeed";

const HeroElements = ({ products }) => {
  return (
    <HeroContainer>
      <ImageWrapperOne>
        <Image
          src={`https://images.unsplash.com/photo-1558882268-15aa056d885f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80`}
          alt="fashion lady with luxuries"
          width={634}
          height={951}
        />
      </ImageWrapperOne>
      <HeroSection>
        <HeroTitle>Our Signature Luxuries</HeroTitle>

        <ProductFeed products={products} />
      </HeroSection>

      <ImageWrapperTwo>
        <Image
          src={`https://images.unsplash.com/photo-1611652022451-d55126758521?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=642&q=80`}
          alt={"fashion lady with luxuries"}
          width={634}
          height={951}
        />
      </ImageWrapperTwo>
    </HeroContainer>
  );
};

export default HeroElements;

const HeroContainer = styled.div`
  height: auto;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1));
  display: flex;
  justify-content: space-between;
  padding-bottom: 120px;

  @media all and (max-width: 1125px) {
    justify-content: center;
  }
`;

const ImageWrapperOne = styled.div`
  opacity: 80%;
  margin-left: -100px;

  @media all and (max-width: 1125px) {
    display: none;
  }
`;

const ImageWrapperTwo = styled.div`
  opacity: 90%;
  margin-right: -100px;

  @media all and (max-width: 1125px) {
    display: none;
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`;

const HeroTitle = styled.h1`
  font-family: "Times New Roman", Times, serif;
  font-size: 40px;
  cursor: default;
  text-align: center;
  color: #ffd700;

  text-shadow: 3px 3px gray;

  @media all and (max-width: 728px) {
    font-size: 32px;
  }
`;
