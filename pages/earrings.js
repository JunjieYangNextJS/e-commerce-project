import React, { useState } from "react";
import styled from "styled-components";
import PaginateBtn from "../components/PaginateBtn";
import { paginate } from "../utility/paginate";
import { getPriceRange } from "../utility/getPriceRange";
import { useLuxuries } from "../contexts/LuxuriesContext";
import LuxuriesItems from "../components/LuxuriesItems";
import FilterSidebarElements from "../components/FilterSidebarElements";
import NavbarWithSearch from "../components/Navbars/NavbarWithSearch";

function Earrings() {
  // get data for earrings
  const luxuries = useLuxuries();
  const allEarrings = luxuries.filter(
    (luxury) => luxury.product.type === "earrings"
  );

  // setState and filter rings depending on searchQuery
  const [earringsSearchQuery, setEarringsSearchQuery] = useState("");

  const earringsFilteredBySearch = allEarrings.filter((earrings) => {
    return (
      earrings.product.name
        .toLowerCase()
        .search(earringsSearchQuery.toLowerCase()) != -1
    );
  });

  // setState and filter earrings depending on their ratings
  const [earringsStarRating, setEarringsStarRating] = useState(1);
  const earringsFilteredByRating = (
    earringsFilteredBySearch ? earringsFilteredBySearch : allEarrings
  ).filter((earrings) => earrings.product.rating >= earringsStarRating);

  // setState and filter earringsFilteredByRating depending on their price ranges
  const [earringsPriceRange, setEarringsPriceRange] = useState("");

  const earringsFilteredByRatingAndPrice = getPriceRange(
    earringsPriceRange,
    earringsFilteredByRating
  );

  // paginating the earrings page and displaying 4 pages at a time
  const [earringsCurrentPage, setEarringsCurrentPage] = useState(1);

  const pageSize = 4;
  let earringsPageNumberArray = [];
  for (
    let i = 1;
    i <=
    Math.ceil(
      (earringsFilteredByRatingAndPrice
        ? earringsFilteredByRatingAndPrice.length
        : earringsFilteredByRating.length) / pageSize
    );
    i++
  )
    earringsPageNumberArray.push(i);

  const earringsEachPage = paginate(
    earringsFilteredByRatingAndPrice
      ? earringsFilteredByRatingAndPrice
      : earringsFilteredByRating,
    earringsCurrentPage,
    pageSize
  );

  return (
    <EarringsPageContainer>
      <NavbarWithSearch
        searchQuery={earringsSearchQuery}
        setSearchQuery={setEarringsSearchQuery}
      />
      <EarringsPageWrapper>
        <FilterSidebarElements
          luxuryRating={earringsStarRating}
          setLuxuryRating={setEarringsStarRating}
          setLuxuryPriceRange={setEarringsPriceRange}
          setLuxuryCurrentPage={setEarringsCurrentPage}
        />
        <EarringsBodyContainer>
          <EarringsBodyTitle>Our Exclusive Earrings</EarringsBodyTitle>
          <EarringsItemsContainer>
            {earringsEachPage.map(({ id, product }) => (
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
          </EarringsItemsContainer>
          <PaginateBtn
            currentPage={earringsCurrentPage}
            setCurrentPage={setEarringsCurrentPage}
            pageNumberArray={earringsPageNumberArray}
          />
        </EarringsBodyContainer>
      </EarringsPageWrapper>
    </EarringsPageContainer>
  );
}

export default Earrings;

const EarringsPageContainer = styled.div``;

const EarringsPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const EarringsBodyContainer = styled.div`
  width: 88vw;
  height: 899px;
`;

const EarringsBodyTitle = styled.h1`
  font-family: "Times New Roman", Times, serif;
  font-size: 42px;
  margin-bottom: 4px;
  cursor: default;
  text-align: center;
  color: black;
`;

const EarringsItemsContainer = styled.div`
  display: grid;
  background-color: #fff;
  height: 800px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  border-radius: 2px solid black;
`;
