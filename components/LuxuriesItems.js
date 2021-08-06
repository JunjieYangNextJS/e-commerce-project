import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Currency from "react-currency-formatter";
import _ from "lodash";
import { flexbox } from "@material-ui/system";

function LuxuriesItems({ image, title, price, rating, description }) {
  return (
    <LuxuryContainer>
      <MainContainer>
        <Image src={image} height={230} width={230} objectFit="contain" />
        <Rating>
          {Array(Math.floor(rating))
            .fill()
            .map((_, i) => (
              <p key={i}>★</p>
            ))}
        </Rating>
        <PriceContainer>
          <Currency quantity={price} />
        </PriceContainer>
      </MainContainer>
      <TextContainer>
        <h4>{title}</h4>
        <Description>{description}</Description>
      </TextContainer>
    </LuxuryContainer>
  );
}

export default LuxuriesItems;

const LuxuryContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: center;
  justify-content: center; */
  margin-left: 100px;
  margin-right: 100px;
  width: 620px;
  gap: 20px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 310px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 310px;

  h4 {
    width: 320px;
    text-align: center;
    margin-bottom: -6px;
  }
`;

const Description = styled.p`
  text-align: left;
  margin-bottom: -7px; ;
`;

const Rating = styled.div`
  display: flex;

  p {
    font-size: 24px;
    color: #febd69;
  }
`;

const PriceContainer = styled.div`
  font-weight: 600;
`;
