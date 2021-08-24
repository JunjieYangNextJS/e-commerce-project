import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import _ from "lodash";

function ProductFeed({ products }) {
  return (
    <HeroMain>
      <HeroProductsContainer>
        <ProductContainerTop>
          <Image
            src="https://cdn.discordapp.com/attachments/800941790798544949/870432514202804224/-1.png"
            height={200}
            width={200}
            objectFit="contain"
          />
          <h4>{products[0].title}</h4>
          <p>{products[0].description}</p>
          {/* <StarIconContainer>
            {Array(products[0].rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={i} />
              ))}
          </StarIconContainer> */}
          <PriceContainer>
            <Currency quantity={products[0].price} />
          </PriceContainer>
        </ProductContainerTop>
        <ProductContainerTop>
          <Image
            src="https://cdn.discordapp.com/attachments/800941790798544949/870436130502365234/3.png"
            height={200}
            width={200}
            objectFit="contain"
          />
          <h4>{products[2].title}</h4>
          <p>{products[2].description}</p>
          {/* <StarIconContainer>
            {Array(products[2].rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={i} />
              ))}
          </StarIconContainer> */}
          <PriceContainer>
            <Currency quantity={products[2].price} />
          </PriceContainer>
        </ProductContainerTop>
      </HeroProductsContainer>

      <HeroProductsContainer>
        <ProductContainerBottom>
          <Image
            src="https://cdn.discordapp.com/attachments/800941790798544949/870434997868326982/2.png"
            height={200}
            width={200}
            objectFit="contain"
          />
          <h4>{products[1].title}</h4>
          <p>{products[1].description}</p>
          {/* <StarIconContainer>
            {Array(products[1].rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={i} />
              ))}
          </StarIconContainer> */}
          <PriceContainer>
            <Currency quantity={products[1].price} />
          </PriceContainer>
        </ProductContainerBottom>
        <ProductContainerBottom>
          <Image
            src="https://cdn.discordapp.com/attachments/800941790798544949/870438441362554880/4.png"
            height={200}
            width={200}
            objectFit="contain"
          />
          <h4>{products[3].title}</h4>
          <p>{products[3].description}</p>
          {/* <StarIconContainer>
            {Array(products[3].rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={i} />
              ))}
          </StarIconContainer> */}
          <PriceContainer>
            <Currency quantity={products[3].price} />
          </PriceContainer>
        </ProductContainerBottom>
      </HeroProductsContainer>
    </HeroMain>
  );
}

export default ProductFeed;

const HeroMain = styled.div`
  @media all and (max-width: 728px) {
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    gap: 70px;
  }
`;

const HeroProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 9vw;
  margin-top: 20px;

  @media all and (max-width: 728px) {
    flex-direction: column;
    align-items: center;
    gap: 100px;
  }
`;

// const StarIconContainer = styled.div`
//   display: flex;
//   height: 2px;
//   object-fit: cover;
// `;

const ProductContainerTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    width: 320px;
    max-width: 80vw;
    text-align: center;
    margin-bottom: -7px;
  }

  p {
    width: 300px;
    max-width: 80vw;
    text-align: center;
    margin-bottom: 7px;
  }

  @media all and (max-width: 728px) {
    gap: 10px;
  }
`;

const ProductContainerBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -15px;
  padding-bottom: 10px;

  h4 {
    width: 320px;
    max-width: 80vw;
    margin-top: -25px;
    text-align: center;
    margin-bottom: -7px;
  }

  p {
    width: 300px;
    max-width: 80vw;
    text-align: center;
    margin-bottom: 7px;
  }

  @media all and (max-width: 728px) {
    gap: 10px;
  }
`;

const PriceContainer = styled.div`
  font-weight: 600;
`;
