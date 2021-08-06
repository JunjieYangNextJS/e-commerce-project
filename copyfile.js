import React from "react";
import styled from "styled-components";
import Product from "./Product";
import Image from "next/image";

function ProductFeed({ products }) {
  const imgSource = [
    "https://cdn.discordapp.com/attachments/800941790798544949/870432514202804224/-1.png",
    ,
    "https://cdn.discordapp.com/attachments/800941790798544949/870434997868326982/2.png",
    ,
    "https://cdn.discordapp.com/attachments/800941790798544949/870436130502365234/3.png",
    ,
    "https://cdn.discordapp.com/attachments/800941790798544949/870438441362554880/4.png",
  ];

  return (
    <HeroProductsContainer>
      {products.map(({ id, title, price, description, category }) => (
        <Product
          key={id}
          id={id}
          title={title}
          price={price}
          description={description}
          category={category}
          image={imgSource.map((src) => src)}
        />
      ))}
    </HeroProductsContainer>
  );
}

export default ProductFeed;

const HeroProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 700px;
  /* background-color: white; */
  gap: 20px;
`;





import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import _ from "lodash";
import { flexbox } from "@material-ui/system";

function Product({ id, title, price, description, category, image }) {
  const [rating] = useState(_.random(1, 5));

  return (
    <ProductContainer>
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4>{title}</h4>
      <p>{description}</p>
      <StarIconContainer>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} />
          ))}
      </StarIconContainer>
      <PriceContainer>
        <Currency quantity={price} />
      </PriceContainer>
    </ProductContainer>
  );
}

export default Product;

const StarIconContainer = styled.div`
  display: flex;
  height: 15px;
  object-fit: cover;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  h4 {
    width: 320px;
    text-align: center;
    margin-bottom: -7px;
  }

  p {
    width: 300px;
    text-align: center;
    margin-bottom: -7px;
  }
`;

const PriceContainer = styled.div`
  font-weight: 600;
`;











