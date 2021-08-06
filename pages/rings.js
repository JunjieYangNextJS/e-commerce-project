import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Navbar from "../components/Navbar";
import PaginateBtn from "../components/PaginateBtn";
import { paginate } from "../utility/paginate";
import { useLuxuries } from "../contexts/LuxuriesContext";
import LuxuriesItems from "../components/LuxuriesItems";
import RingsSidebar from "../components/FilterSidebar/RingsSidebar";

function Rings() {
  // get data for rings
  const luxuries = useLuxuries();
  const allRings = luxuries.filter((luxury) => luxury.product.type === "rings");

  // setState and filter rings depending on their ratings
  const [ringsStarRating, setRingsStarRating] = useState(1);
  const ringsFilteredByRating = allRings.filter(
    (ring) => ring.product.rating >= ringsStarRating
  );

  // setState and filter rings depending on their price ranges
  const [ringsPriceRange, setRingsPriceRange] = useState("");
  const getPriceRange = (priceRange, filteredByRating) => {
    switch (priceRange) {
      case "a":
        return filteredByRating.filter((luxury) => luxury.product.price < 500);
      case "b":
        return filteredByRating.filter(
          (luxury) => luxury.product.price >= 500 && luxury.product.price < 1000
        );
      case "c":
        return filteredByRating.filter(
          (luxury) =>
            luxury.product.price >= 1000 && luxury.product.price < 1500
        );
      case "d":
        return filteredByRating.filter((luxury) => luxury.product.price > 1500);
      default:
        return null;
    }
  };

  const ringsFilteredByRatingAndPrice = getPriceRange(
    ringsPriceRange,
    ringsFilteredByRating
  );

  // set rings page pagination state
  const [ringsCurrentPage, setRingsCurrentPage] = useState(1);

  const pageSize = 4;
  let ringsPageNumberArray = [];
  for (
    let i = 1;
    i <=
    Math.ceil(
      (ringsFilteredByRatingAndPrice
        ? ringsFilteredByRatingAndPrice.length
        : ringsFilteredByRating.length) / pageSize
    );
    i++
  )
    ringsPageNumberArray.push(i);

  const ringsEachPage = paginate(
    ringsFilteredByRatingAndPrice
      ? ringsFilteredByRatingAndPrice
      : ringsFilteredByRating,
    ringsCurrentPage,
    pageSize
  );

  return (
    <RingsPageContainer>
      <Navbar />
      <RingsPageWrapper>
        <RingsSidebar
          setRingsStarRating={setRingsStarRating}
          setRingsPriceRange={setRingsPriceRange}
        />
        <RingsBodyContainer>
          <RingsBodyTitle>WELCOME TO POPO</RingsBodyTitle>
          <RingsItemsContainer>
            {ringsEachPage.map(({ id, product }) => (
              <LuxuriesItems
                key={id}
                image={product.image}
                title={product.name}
                price={product.price}
                rating={product.rating}
                description={product.description}
              />
            ))}
          </RingsItemsContainer>
        </RingsBodyContainer>
      </RingsPageWrapper>
      <PaginateBtn
        setCurrentPage={setRingsCurrentPage}
        pageNumberArray={ringsPageNumberArray}
      />
    </RingsPageContainer>
  );
}

export default Rings;

const RingsPageContainer = styled.div``;

const RingsPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const RingsBodyContainer = styled.div`
  width: 88vw;
  height: 900px;
`;

const RingsBodyTitle = styled.h1`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 40px;
  height: 60px;
`;

const RingsItemsContainer = styled.div`
  display: grid;
  background-color: #fff;
  height: 800px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  border-radius: 2px solid black;
`;

const RingsItem = styled.div`
  background-color: transparent;
  color: black;
  font-size: 16px;
`;
