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
    <RingsPageContainer>
      <Head>
        <title>Our Exclusive Rings</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Here are some of our signature rings designs."
        ></meta>
      </Head>
      <NavbarWithSearch
        searchQuery={ringsSearchQuery}
        setSearchQuery={setRingsSearchQuery}
      />
      <RingsPageWrapper>
        <FilterSidebarElements
          luxuryRating={ringsStarRating}
          setLuxuryRating={setRingsStarRating}
          luxuryPriceRange={ringsPriceRange}
          setLuxuryPriceRange={setRingsPriceRange}
          setLuxuryCurrentPage={setRingsCurrentPage}
          luxuryType={"rings"}
        />
        <FilterBottombarElements
          hideBottombarOnScroll={hideBottombarOnScroll}
          expandBottombar={expandBottombar}
          luxuryRating={ringsStarRating}
          setLuxuryRating={setRingsStarRating}
          luxuryPriceRange={ringsPriceRange}
          setLuxuryPriceRange={setRingsPriceRange}
          setLuxuryCurrentPage={setRingsCurrentPage}
          luxuryType={"rings"}
        />
        <RingsBodyContainer>
          <RingsBodyTitle>Our Exclusive Rings</RingsBodyTitle>
          <RingsItemsContainer>
            {ringsEachPage.map(({ id, product }) => (
              <LuxuriesItems
                key={id}
                id={id}
                image={product.image}
                alt="rings"
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
          <FilterBottombarEnabler onClick={handleBottombarExpanded}>
            Filter
          </FilterBottombarEnabler>
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

  @media all and (max-width: 1330px) {
    flex-direction: column;
    width: 100%;
  }
`;

const RingsBodyContainer = styled.div`
  position: relative;
  width: 87vw;
  min-height: calc(100vh - 70px);
  height: auto;
  padding-bottom: 120px;

  @media all and (max-width: 1330px) {
    width: 100%;
  }
`;

const RingsBodyTitle = styled.h1`
  font-family: "Times New Roman", Times, serif;
  font-size: 42px;
  cursor: default;
  text-align: center;
  color: #1b1b1b;
`;

const RingsItemsContainer = styled.div`
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
