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
        <ProductContainer>
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
        </ProductContainer>
        <ProductContainer>
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
        </ProductContainer>
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

const HeroMain = styled.div``;

const HeroProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  /* background-color: white; */
  gap: 35px;
  align-items: flex-start;
  margin-top: 20px;
`;

// const StarIconContainer = styled.div`
//   display: flex;
//   height: 2px;
//   object-fit: cover;
// `;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    width: 320px;
    text-align: center;
    margin-bottom: -7px;
  }

  p {
    width: 300px;
    text-align: center;
    margin-bottom: 7px;
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
    margin-top: -25px;
    text-align: center;
    margin-bottom: -7px;
  }

  p {
    width: 300px;
    text-align: center;
    margin-bottom: 7px;
  }
`;

const PriceContainer = styled.div`
  font-weight: 600;
`;
