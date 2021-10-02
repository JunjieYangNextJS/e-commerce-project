import React from "react";
import styled, { css } from "styled-components";
import router from "next/router";
import ReactStars from "react-rating-stars-component";

// defining price range array
export const priceRangeArray = [
  "Under $500",
  "$500 to $1000",
  "$1000 to $2000",
  "Above $2000",
];

function FilterBottombarElements({
  hideBottombarOnScroll,
  expandBottombar,
  luxuryRating,
  setLuxuryRating,
  luxuryPriceRange,
  setLuxuryPriceRange,
  setLuxuryCurrentPage,
  luxuryType,
}) {
  const directToPage = (page) => {
    router.push(`/${page}`);
  };

  // handle rating change
  const ratingArray = [4, 3, 2, 1];

  const changeRating = (rating) => {
    setLuxuryRating(rating);
    setLuxuryCurrentPage(1);
    directToPage(luxuryType);
  };

  // handle price range change
  const changePriceRange = (range) => {
    setLuxuryPriceRange(range);
    setLuxuryCurrentPage(1);
    directToPage(luxuryType);
  };

  const resetPriceRange = () => {
    setLuxuryPriceRange("");
    setLuxuryCurrentPage(1);
    directToPage(luxuryType);
  };

  return (
    <FilterBottombarContainer
      expandBottombar={expandBottombar}
      hideBottombarOnScroll={hideBottombarOnScroll}
    >
      <FilterBottombarWrapper>
        <FilterSectionWrapper>
          <FilterSectionTitle>Price Ranges</FilterSectionTitle>
          <ItemPriceContainer>
            <ResetItemPrice onClick={resetPriceRange}>
              All Prices
            </ResetItemPrice>
            {priceRangeArray.map((range, index) => (
              <ItemPriceWrapper key={index}>
                <ItemPrice
                  currentPriceRange={range}
                  luxuryPriceRange={luxuryPriceRange}
                  onClick={() => changePriceRange(range)}
                >
                  {range}
                </ItemPrice>
              </ItemPriceWrapper>
            ))}
          </ItemPriceContainer>
        </FilterSectionWrapper>
        <FilterSectionWrapper>
          <FilterSectionTitle>Customer Ratings</FilterSectionTitle>
          <ItemRatingContainer>
            {ratingArray.map((n) => (
              <ItemRatingWrapper key={n}>
                <ItemRating
                  currentRating={n}
                  luxuryRating={luxuryRating}
                  onClick={() => changeRating(n)}
                >
                  <ReactStars count={n} size={24} color="#ffd700" /> & Up
                </ItemRating>
              </ItemRatingWrapper>
            ))}
          </ItemRatingContainer>
        </FilterSectionWrapper>
      </FilterBottombarWrapper>
    </FilterBottombarContainer>
  );
}

export default FilterBottombarElements;

const FilterBottombarContainer = styled.div`
  z-index: 10;
  width: 100%;
  height: 50vh;
  position: absolute;
  bottom: -100%;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.5)
  );
  transition: all 0.5s ease;
  opacity: 1;
  visibility: hidden;

  @media all and (max-width: 1330px) {
    display: ${({ expandBottombar }) => (expandBottombar ? "flex" : "none")};
    visibility: ${({ expandBottombar }) =>
      expandBottombar ? "visible" : "hidden"};
    bottom: ${({ expandBottombar }) => (expandBottombar ? "0" : "-100%")};
  }
  @media all and (max-width: 1125px) {
    display: ${({ hideBottombarOnScroll }) =>
      hideBottombarOnScroll ? "none" : "flex"};
    visibility: ${({ expandBottombar }) =>
      expandBottombar ? "visible" : "hidden"};

    bottom: ${({ expandBottombar }) => (expandBottombar ? "0" : "-100%")};
  }
`;

const FilterBottombarWrapper = styled.div`
  top: 25vh;
  display: flex;

  justify-content: center;
  align-items: center;

  display: flex;

  flex-direction: row;
  justify-content: space-between;

  height: 80%;
  width: 80%;
`;

const FilterSectionWrapper = styled.div`
  width: 40%;
  height: 100%;
  margin-top: -2%;

  @media all and (max-width: 420px) {
    min-width: 35vw;
  }
`;

const FilterSectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  font-weight: bold;
  color: #1b1b1b;
  height: 25%;
  letter-spacing: 0.5px;
  word-spacing: 2px;
  padding-bottom: 2vh;

  @media all and (max-width: 728px) {
    font-size: 16px;
  }

  @media all and (max-width: 420px) {
    letter-spacing: 0;
    word-spacing: 0;
    font-size: 13px;
  }
`;

const ItemPriceContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 75%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 15px 5px #a6a6a6;
`;

const ResetItemPrice = styled.button`
  border: none;
  background-color: transparent;
  color: #1b1b1b;
  cursor: pointer;

  font-weight: 400;
  font-size: 18px;
  height: 20%;

  @media all and (max-width: 728px) {
    font-size: 16px;
  }

  @media all and (max-width: 420px) {
    font-size: 13px;
  }
`;

const ItemPriceWrapper = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  height: 20%;
`;

const ItemPrice = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #1b1b1b;
  font-size: 18px;
  margin-bottom: 0;

  ${({ luxuryPriceRange, currentPriceRange }) =>
    luxuryPriceRange === currentPriceRange &&
    css`
      color: #ffd700;
      font-size: 18px;
      margin-bottom: 0px;
    `}

  @media all and (max-width: 728px) {
    font-size: 16px;
  }

  @media all and (max-width: 420px) {
    font-size: 13px;
  }
`;

const ItemRatingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 15px 1px #a6a6a6;
  justify-content: space-evenly;
`;

const ItemRatingWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ItemRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #1b1b1b;
  font-weight: ${({ luxuryRating, currentRating }) =>
    luxuryRating === currentRating ? "700" : "default"};

  @media all and (max-width: 420px) {
    font-size: 10px;
  }
`;
