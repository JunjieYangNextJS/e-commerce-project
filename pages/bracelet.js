import React, { useState } from "react";
import styled from "styled-components";
import PaginateBtn from "../components/PaginateBtn";
import { paginate } from "../utility/paginate";
import { getPriceRange } from "../utility/getPriceRange";
import { useLuxuries } from "../contexts/LuxuriesContext";
import LuxuriesItems from "../components/LuxuriesItems";
import FilterSidebarElements from "../components/FilterSidebarElements";
import NavbarWithSearch from "./../components/Navbars/NavbarWithSearch";

function Bracelet() {
  // get data for bracelet
  const luxuries = useLuxuries();
  const allBracelet = luxuries.filter(
    (luxury) => luxury.product.type === "bracelet"
  );

  // setState and filter rings depending on searchQuery
  const [braceletSearchQuery, setBraceletSearchQuery] = useState("");

  const braceletFilteredBySearch = allBracelet.filter((bracelet) => {
    return (
      bracelet.product.name
        .toLowerCase()
        .search(braceletSearchQuery.toLowerCase()) != -1
    );
  });

  // setState and filter bracelet depending on their ratings
  const [braceletStarRating, setBraceletStarRating] = useState(1);
  const braceletFilteredByRating = (
    braceletFilteredBySearch ? braceletFilteredBySearch : allBracelet
  ).filter((bracelet) => bracelet.product.rating >= braceletStarRating);

  // setState and filter braceletFilteredByRating depending on their price ranges
  const [braceletPriceRange, setBraceletPriceRange] = useState("");

  const braceletFilteredByRatingAndPrice = getPriceRange(
    braceletPriceRange,
    braceletFilteredByRating
  );

  // paginating the bracelet page and displaying 4 pages at a time
  const [braceletCurrentPage, setBraceletCurrentPage] = useState(1);

  const pageSize = 4;
  let braceletPageNumberArray = [];
  for (
    let i = 1;
    i <=
    Math.ceil(
      (braceletFilteredByRatingAndPrice
        ? braceletFilteredByRatingAndPrice.length
        : braceletFilteredByRating.length) / pageSize
    );
    i++
  )
    braceletPageNumberArray.push(i);

  const braceletEachPage = paginate(
    braceletFilteredByRatingAndPrice
      ? braceletFilteredByRatingAndPrice
      : braceletFilteredByRating,
    braceletCurrentPage,
    pageSize
  );

  return (
    <BraceletPageContainer>
      <NavbarWithSearch
        searchQuery={braceletSearchQuery}
        setSearchQuery={setBraceletSearchQuery}
      />
      {/* <BraceletPageWrapper>
        <FilterSidebarElements
          luxuryRating={braceletStarRating}
          setLuxuryRating={setBraceletStarRating}
          setLuxuryPriceRange={setBraceletPriceRange}
          setLuxuryCurrentPage={setBraceletCurrentPage}
        />
        <BraceletBodyContainer>
          <BraceletBodyTitle>Our Exclusive Bracelet</BraceletBodyTitle>
          <BraceletItemsContainer>
            {braceletEachPage.map(({ id, product }) => (
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
          </BraceletItemsContainer>
          <PaginateBtn
            currentPage={braceletCurrentPage}
            setCurrentPage={setBraceletCurrentPage}
            pageNumberArray={braceletPageNumberArray}
          />
        </BraceletBodyContainer>
      </BraceletPageWrapper> */}
    </BraceletPageContainer>
  );
}

export default Bracelet;

const BraceletPageContainer = styled.div``;

const BraceletPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const BraceletBodyContainer = styled.div`
  width: 88vw;
  height: 899px;
`;

const BraceletBodyTitle = styled.h1`
  font-family: "Times New Roman", Times, serif;
  font-size: 42px;
  margin-bottom: 4px;
  cursor: default;
  text-align: center;
  color: black;
`;

const BraceletItemsContainer = styled.div`
  display: grid;
  background-color: #fff;
  height: 800px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  border-radius: 2px solid black;
`;
