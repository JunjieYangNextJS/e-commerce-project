import React, { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import PaginateBtn from "../components/PaginateBtn";
import { paginate } from "../utility/paginate";
import { getPriceRange } from "../utility/getPriceRange";
import { useLuxuries } from "../contexts/LuxuriesContext";
import LuxuriesItems from "../components/LuxuriesItems";
import FilterSidebarElements from "../components/FilterSidebarElements";
import NavbarWithSearch from "../components/Navbars/NavbarWithSearch";
import FilterBottombarElements from "../components/FilterBottombarElements";
import disableScroll from "disable-scroll";

function Necklace() {
  // get data for necklace
  const luxuries = useLuxuries();
  const allNecklace = luxuries.filter(
    (luxury) => luxury.product.type === "necklace"
  );

  // setState and filter rings depending on searchQuery
  const [necklaceSearchQuery, setNecklaceSearchQuery] = useState("");

  const necklaceFilteredBySearch = allNecklace.filter((necklace) => {
    return (
      necklace.product.name
        .toLowerCase()
        .search(necklaceSearchQuery.toLowerCase()) != -1
    );
  });

  // setState and filter necklace depending on their ratings
  const [necklaceStarRating, setNecklaceStarRating] = useState(1);
  const necklaceFilteredByRating = (
    necklaceFilteredBySearch ? necklaceFilteredBySearch : allNecklace
  ).filter((necklace) => necklace.product.rating >= necklaceStarRating);

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

  // // handle hiding the bottombar in y-axis from the user
  const [hideBottombarOnScroll, setHideBottombarOnScroll] = useState(false);

  useEffect(() => {
    return () =>
      window.addEventListener(
        "scroll",
        function () {
          if (window.pageYOffset > 100) {
            setHideBottombarOnScroll(true);
          } else {
            setHideBottombarOnScroll(false);
          }
        },
        [hideBottombarOnScroll]
      );
  });

  // handle showing and folding the expandBottombar in different situations
  const [expandBottombar, setExpandBottombar] = useState(false);

  const handleBottombarExpanded = () => {
    window.scrollTo(0, 0);
    setHideBottombarOnScroll(false);
    setExpandBottombar(!expandBottombar);
    !expandBottombar ? disableScroll.on() : disableScroll.off();
  };

  const handleBottombarOnResize = () => {
    setExpandBottombar(false);
    disableScroll.off();
  };

  useEffect(() => {
    window.addEventListener("resize", handleBottombarOnResize);
    return () => window.removeEventListener("resize", handleBottombarOnResize);
  }, [expandBottombar]);

  return (
    <NecklacePageContainer>
      <Head>
        <title>Our Exclusive Necklaces</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Here are some of our signature necklace designs."
        ></meta>
      </Head>
      <NavbarWithSearch
        searchQuery={necklaceSearchQuery}
        setSearchQuery={setNecklaceSearchQuery}
      />
      <NecklacePageWrapper>
        <FilterSidebarElements
          luxuryRating={necklaceStarRating}
          setLuxuryRating={setNecklaceStarRating}
          luxuryPriceRange={necklacePriceRange}
          setLuxuryPriceRange={setNecklacePriceRange}
          setLuxuryCurrentPage={setNecklaceCurrentPage}
          luxuryType={"necklace"}
        />
        <FilterBottombarElements
          hideBottombarOnScroll={hideBottombarOnScroll}
          expandBottombar={expandBottombar}
          luxuryRating={necklaceStarRating}
          setLuxuryRating={setNecklaceStarRating}
          luxuryPriceRange={necklacePriceRange}
          setLuxuryPriceRange={setNecklacePriceRange}
          setLuxuryCurrentPage={setNecklaceCurrentPage}
          luxuryType={"necklace"}
        />
        <NecklaceBodyContainer>
          <NecklaceBodyTitle>Our Exclusive Necklaces</NecklaceBodyTitle>
          <NecklaceItemsContainer>
            {necklaceEachPage.map(({ id, product }) => (
              <LuxuriesItems
                key={id}
                id={id}
                image={product.image}
                alt="necklace"
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
          <FilterBottombarEnabler onClick={handleBottombarExpanded}>
            Filter
          </FilterBottombarEnabler>
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

  @media all and (max-width: 1330px) {
    flex-direction: column;
    width: 100%;
  }
`;

const NecklaceBodyContainer = styled.div`
  position: relative;
  width: 87vw;
  min-height: calc(100vh - 70px);
  height: auto;
  padding-bottom: 120px;

  @media all and (max-width: 1330px) {
    width: 100%;
  }
`;

const NecklaceBodyTitle = styled.h1`
  font-family: "Times New Roman", Times, serif;
  font-size: 42px;
  cursor: default;
  text-align: center;
  color: #1b1b1b;
`;

const NecklaceItemsContainer = styled.div`
  display: grid;
  background-color: #fff;
  height: auto;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

  @media all and (max-width: 1125px) {
    grid-template-columns: none;
    grid-template-rows: repeat(4, 1fr);
  }
`;

const FilterBottombarEnabler = styled.button`
  display: none;

  @media all and (max-width: 1330px) {
    display: flex;
    position: absolute;
    top: 5px;
    left: 5px;
    outline: none;
    border: 1px solid #a6a6a6;
    border-radius: 50px;
    font-size: 15px;
    padding: 3px 15px;
    cursor: pointer;
    z-index: 70;
    box-shadow: 0 0 5px 3px rgb(239, 239, 239);
  }
`;
