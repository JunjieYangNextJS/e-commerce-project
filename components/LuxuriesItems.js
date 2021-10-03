import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { db, increment } from "../firebase";
import { signIn, useSession } from "next-auth/client";

function LuxuriesItems({ id, image, alt, title, price, rating, description }) {
  const [session] = useSession();

  const addToCart = async (id) => {
    if (session) {
      const cartRef = db.collection("cartItems");
      const snapshot = await cartRef
        .where("cartItemId", "==", id)
        .where("userEmail", "==", session.user.email)
        .get();

      if (snapshot.empty) {
        db.collection("cartItems").add({
          cartItemId: id,
          userEmail: session.user.email,
          name: title,
          image: image,
          alt: "luxury",
          price: price,
          quantity: 1,
        });
      } else {
        snapshot.docs[0].ref.update({
          quantity: increment,
        });
      }
    } else {
      signIn();
    }
  };

  return (
    <LuxuryContainer>
      <MainContainer>
        <Image
          src={image}
          alt={alt}
          height={230}
          width={230}
          objectFit="contain"
        />
        <Rating>
          {Array(Math.floor(rating))
            .fill()
            .map((_, i) => (
              <p key={i}>★</p>
            ))}
        </Rating>
        <PriceContainer>
          <Currency quantity={parseInt(price)} />
        </PriceContainer>
      </MainContainer>
      <TextContainer>
        <h4>{title}</h4>
        <Description>{description}</Description>
        <AddToCartButton onClick={() => addToCart(id)}>
          Add To Cart
        </AddToCartButton>
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
      width: 100%;
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
