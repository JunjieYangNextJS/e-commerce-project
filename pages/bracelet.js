import React, { useState, useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import PaginateBtn from "../components/PaginateBtn";
import { paginate } from "../utility/paginate";
import { getPriceRange } from "../utility/getPriceRange";
import { useLuxuries } from "../contexts/LuxuriesContext";
import LuxuriesItems from "../components/LuxuriesItems";
import FilterSidebarElements from "../components/FilterSidebarElements";
import NavbarWithSearch from "./../components/Navbars/NavbarWithSearch";
import FilterBottombarElements from "../components/FilterBottombarElements";
import disableScroll from "disable-scroll";

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

  // handle hiding the bottombar in y-axis from the user
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
    <BraceletPageContainer>
      <Head>
        <title>Our Exclusive Bracelets</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Here are some of our signature bracelet designs."
        ></meta>
      </Head>
      <NavbarWithSearch
        searchQuery={braceletSearchQuery}
        setSearchQuery={setBraceletSearchQuery}
      />
      <BraceletPageWrapper>
        <FilterSidebarElements
          luxuryRating={braceletStarRating}
          setLuxuryRating={setBraceletStarRating}
          luxuryPriceRange={braceletPriceRange}
          setLuxuryPriceRange={setBraceletPriceRange}
          setLuxuryCurrentPage={setBraceletCurrentPage}
          luxuryType={"bracelet"}
        />
        <FilterBottombarElements
          hideBottombarOnScroll={hideBottombarOnScroll}
          expandBottombar={expandBottombar}
          luxuryRating={braceletStarRating}
          setLuxuryRating={setBraceletStarRating}
          luxuryPriceRange={braceletPriceRange}
          setLuxuryPriceRange={setBraceletPriceRange}
          setLuxuryCurrentPage={setBraceletCurrentPage}
          luxuryType={"bracelet"}
        />
        <BraceletBodyContainer>
          <BraceletBodyTitle>Our Exclusive Bracelets</BraceletBodyTitle>
          <BraceletItemsContainer>
            {braceletEachPage.map(({ id, product }) => (
              <LuxuriesItems
                key={id}
                id={id}
                image={product.image}
                alt="bracelet"
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
          <FilterBottombarEnabler onClick={handleBottombarExpanded}>
            Filter
          </FilterBottombarEnabler>
        </BraceletBodyContainer>
      </BraceletPageWrapper>
    </BraceletPageContainer>
  );
}

export default Bracelet;

const BraceletPageContainer = styled.div``;

const BraceletPageWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media all and (max-width: 1330px) {
    flex-direction: column;
    width: 100%;
  }
`;

const BraceletBodyContainer = styled.div`
  position: relative;
  width: 87vw;
  min-height: calc(100vh - 70px);
  height: auto;
  padding-bottom: 120px;

  @media all and (max-width: 1330px) {
    width: 100%;
  }
`;

const BraceletBodyTitle = styled.h1`
  font-family: "Times New Roman", Times, serif;
  font-size: 42px;
  cursor: default;
  text-align: center;
  color: #1b1b1b;
`;

const BraceletItemsContainer = styled.div`
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
    box-shadow: 0 0 5px 3px rgb(239, 239, 239);
  }
`;
