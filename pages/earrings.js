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
    <EarringsPageContainer>
      <Head>
        <title>Our Exclusive Earrings</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Here are some of our signature earrings designs."
        ></meta>
      </Head>
      <NavbarWithSearch
        searchQuery={earringsSearchQuery}
        setSearchQuery={setEarringsSearchQuery}
      />
      <EarringsPageWrapper>
        <FilterSidebarElements
          luxuryRating={earringsStarRating}
          setLuxuryRating={setEarringsStarRating}
          luxuryPriceRange={earringsPriceRange}
          setLuxuryPriceRange={setEarringsPriceRange}
          setLuxuryCurrentPage={setEarringsCurrentPage}
          luxuryType={"earrings"}
        />
        <FilterBottombarElements
          hideBottombarOnScroll={hideBottombarOnScroll}
          expandBottombar={expandBottombar}
          luxuryRating={earringsStarRating}
          setLuxuryRating={setEarringsStarRating}
          luxuryPriceRange={earringsPriceRange}
          setLuxuryPriceRange={setEarringsPriceRange}
          setLuxuryCurrentPage={setEarringsCurrentPage}
          luxuryType={"earrings"}
        />
        <EarringsBodyContainer>
          <EarringsBodyTitle>Our Exclusive Earrings</EarringsBodyTitle>
          <EarringsItemsContainer>
            {earringsEachPage.map(({ id, product }) => (
              <LuxuriesItems
                key={id}
                id={id}
                image={product.image}
                alt="earrings"
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
          <FilterBottombarEnabler onClick={handleBottombarExpanded}>
            Filter
          </FilterBottombarEnabler>
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

  @media all and (max-width: 1330px) {
    flex-direction: column;
    width: 100%;
  }
`;

const EarringsBodyContainer = styled.div`
  position: relative;
  width: 87vw;
  min-height: calc(100vh - 70px);
  height: auto;
  padding-bottom: 120px;

  @media all and (max-width: 1330px) {
    width: 100%;
  }
`;

const EarringsBodyTitle = styled.h1`
  font-family: "Times New Roman", Times, serif;
  font-size: 42px;
  cursor: default;
  text-align: center;
  color: #1b1b1b;
`;

const EarringsItemsContainer = styled.div`
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
