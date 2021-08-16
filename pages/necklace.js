import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import PaginateBtn from "../components/PaginateBtn";
import { paginate } from "../utility/paginate";
import { getPriceRange } from "../utility/getPriceRange";
import { useLuxuries } from "../contexts/LuxuriesContext";
import LuxuriesItems from "../components/LuxuriesItems";
import FilterSidebarElements from "../components/FilterSidebarElements";

function Necklace() {
  // get data for necklace
  const luxuries = useLuxuries();
  const allNecklace = luxuries.filter(
    (luxury) => luxury.product.type === "necklace"
  );

  // setState and filter necklace depending on their ratings
  const [necklaceStarRating, setNecklaceStarRating] = useState(1);
  const necklaceFilteredByRating = allNecklace.filter(
    (necklace) => necklace.product.rating >= necklaceStarRating
  );

  // setState and filter necklaceFilteredByRating depending on their price ranges
  const [necklacePriceRange, setNecklacePriceRange] = useState("");

  const necklaceFilteredByRatingAndPrice = getPriceRange(
    necklacePriceRange,
    necklaceFilteredByRating
  );

  // paginating the necklace page and displaying 4 pages at a time
  const [necklaceCurrentPage, setNecklaceCurrentPage] = useState(1);

  const pageSize = 4;
  let necklacePageNumberArray = [];
  for (
    let i = 1;
    i <=
    Math.ceil(
      (necklaceFilteredByRatingAndPrice
        ? necklaceFilteredByRatingAndPrice.length
        : necklaceFilteredByRating.length) / pageSize
    );
    i++
  )
    necklacePageNumberArray.push(i);

  const necklaceEachPage = paginate(
    necklaceFilteredByRatingAndPrice
      ? necklaceFilteredByRatingAndPrice
      : necklaceFilteredByRating,
    necklaceCurrentPage,
    pageSize
  );

  return (
    <NecklacePageContainer>
      <Navbar />
      <NecklacePageWrapper>
        <FilterSidebarElements
          luxuryRating={necklaceStarRating}
          setLuxuryRating={setNecklaceStarRating}
          setLuxuryPriceRange={setNecklacePriceRange}
          setLuxuryCurrentPage={setNecklaceCurrentPage}
        />
        <NecklaceBodyContainer>
          <NecklaceBodyTitle>Our Exclusive Necklace</NecklaceBodyTitle>
          <NecklaceItemsContainer>
            {necklaceEachPage.map(({ id, product }) => (
              <LuxuriesItems
                key={id}
                id={id}
                image={product.image}
                title={product.name}
                price={product.price}
                rating={product.rating}
                description={product.description}
              />
            ))}
          </NecklaceItemsContainer>
          <PaginateBtn
            currentPage={necklaceCurrentPage}
            setCurrentPage={setNecklaceCurrentPage}
            pageNumberArray={necklacePageNumberArray}
          />
        </NecklaceBodyContainer>
      </NecklacePageWrapper>
    </NecklacePageContainer>
  );
}

export default Necklace;

const NecklacePageContainer = styled.div``;

const NecklacePageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const NecklaceBodyContainer = styled.div`
  width: 88vw;
  height: 899px;
`;

const NecklaceBodyTitle = styled.h1`
  font-family: "Times New Roman", Times, serif;
  font-size: 42px;
  margin-bottom: 4px;
  cursor: default;
  text-align: center;
  color: black;
`;

const NecklaceItemsContainer = styled.div`
  display: grid;
  background-color: #fff;
  height: 800px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  border-radius: 2px solid black;
`;
