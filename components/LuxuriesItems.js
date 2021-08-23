import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Currency from "react-currency-formatter";
import _ from "lodash";
import { db } from "../firebase";

function LuxuriesItems({ id, image, title, price, rating, description }) {
  const addToCart = () => {
    const cartItem = db.collection("cartItems").doc(id);
    cartItem.get().then((doc) => {
      if (doc.exists) {
        cartItem.update({
          quantity: doc.data().quantity + 1,
        });
      } else {
        db.collection("cartItems").doc(id).set({
          name: title,
          image: image,
          price: price,
          quantity: 1,
        });
      }
    });
  };

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
        <AddToCartButton onClick={addToCart}>Add To Cart</AddToCartButton>
      </TextContainer>
    </LuxuryContainer>
  );
}

export default LuxuriesItems;

const LuxuryContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 40px 0px;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;

  h4 {
    width: 320px;
    text-align: center;
    margin-bottom: -6px;
    font-weight: 800;
  }

  @media all and (max-width: 1330px) {
    h4 {
      width: 240px;
    }
  }
`;

const Description = styled.p`
  text-align: center;
`;

const AddToCartButton = styled.div`
  font-size: 15px;
  border-radius: 10px;
  line-height: 12px;
  padding: 10px 15px;
  color: #e5dfd9;
  text-align: center;
  cursor: pointer;
  background-color: #1b1b1b;
  border-color: #1b1b1b;
`;

const Rating = styled.div`
  display: flex;

  p {
    font-size: 24px;
    color: #febd69;
  }
`;

const PriceContainer = styled.div`
  font-weight: bold;
`;
