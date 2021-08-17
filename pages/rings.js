import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import PaginateBtn from "../components/PaginateBtn";
import { paginate } from "../utility/paginate";
import { getPriceRange } from "../utility/getPriceRange";
import { useLuxuries } from "../contexts/LuxuriesContext";
import LuxuriesItems from "../components/LuxuriesItems";
import FilterSidebarElements from "../components/FilterSidebarElements";

function Rings() {
  // get data for rings
  const luxuries = useLuxuries();
  const allRings = luxuries.filter((luxury) => luxury.product.type === "rings");

  // setState and filter rings depending on searchQuery
  const [ringsSearchQuery, setRingsSearchQuery] = useState("");

  const ringsFilteredBySearch = allRings.filter((ring) => {
    return (
      ring.product.name.toLowerCase().search(ringsSearchQuery.toLowerCase()) !=
      -1
    );
  });

  // setState and filter rings depending on their ratings
  const [ringsStarRating, setRingsStarRating] = useState(1);
  const ringsFilteredByRating = (
    ringsFilteredBySearch ? ringsFilteredBySearch : allRings
  ).filter((ring) => ring.product.rating >= ringsStarRating);

  // setState and filter ringsFilteredByRating depending on their price ranges
  const [ringsPriceRange, setRingsPriceRange] = useState("");

  const ringsFilteredByRatingAndPrice = getPriceRange(
    ringsPriceRange,
    ringsFilteredByRating
  );

  // paginating the rings page and displaying 4 pages at a time
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

  // paginating in action
  const ringsEachPage = paginate(
    ringsFilteredByRatingAndPrice
      ? ringsFilteredByRatingAndPrice
      : ringsFilteredByRating,
    ringsCurrentPage,
    pageSize
  );

  return (
    <RingsPageContainer>
      <Navbar
        searchQuery={ringsSearchQuery}
        setSearchQuery={setRingsSearchQuery}
      />
      <RingsPageWrapper>
        <FilterSidebarElements
          luxuryRating={ringsStarRating}
          setLuxuryRating={setRingsStarRating}
          setLuxuryPriceRange={setRingsPriceRange}
          setLuxuryCurrentPage={setRingsCurrentPage}
        />
        <RingsBodyContainer>
          <RingsBodyTitle>Our Exclusive Rings</RingsBodyTitle>
          <RingsItemsContainer>
            {ringsEachPage.map(({ id, product }) => (
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
          </RingsItemsContainer>
          <PaginateBtn
            currentPage={ringsCurrentPage}
            setCurrentPage={setRingsCurrentPage}
            pageNumberArray={ringsPageNumberArray}
          />
        </RingsBodyContainer>
      </RingsPageWrapper>
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
  height: 899px;
`;

const RingsBodyTitle = styled.h1`
  font-family: "Times New Roman", Times, serif;
  font-size: 42px;
  margin-bottom: 4px;
  cursor: default;
  text-align: center;
  color: black;
`;

const RingsItemsContainer = styled.div`
  display: grid;
  background-color: #fff;
  height: 800px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  border-radius: 2px solid black;
`;
