import React, { useState } from "react";
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

function FilterSidebarElements({
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
    <FilterSidebarContainer>
      <FilterSidebarWrapper>
        <ItemPriceContainer>
          <ResetItemPrice onClick={resetPriceRange}>All Prices</ResetItemPrice>
          {priceRangeArray.map((range, index) => (
            <ItemPriceWrapper key={index}>
              <ItemPrice
                currentPriceRange={range}
                luxuryPriceRange={luxuryPriceRange}
                onClick={() => changePriceRange(range)}
              >
                {range}
              </ItemPrice>
              <hr />
            </ItemPriceWrapper>
          ))}
        </ItemPriceContainer>

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
              <hr />
            </ItemRatingWrapper>
          ))}
        </ItemRatingContainer>
      </FilterSidebarWrapper>
    </FilterSidebarContainer>
  );
}

export default FilterSidebarElements;

const FilterSidebarContainer = styled.div`
  width: 10vw;
  background: #a6a6a6;
  z-index: 10;
  height: auto;
  position: relative;

  @media all and (max-width: 1330px) {
    width: 100%;
    height: 50vh;
    position: absolute;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
  }
`;

const FilterSidebarWrapper = styled.div`
  position: sticky;
  top: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 150px;
  @media all and (max-width: 1330px) {
    display: flex;
    /* todo */
    flex-direction: row;
    justify-content: space-between;

    height: 80%;
    width: 80%;
  }
`;

const FilterSectionWrapper = styled.div`
  @media all and (max-width: 1330px) {
    width: 40%;
    height: 100%;
    margin-top: -2%;
    min-width: 35vw;
  }
`;

const FilterSectionTitle = styled.div`
  @media all and (max-width: 1330px) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 21px;
    font-weight: bold;
    height: 25%;
    letter-spacing: 0.5px;
    word-spacing: 2px;
  }

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
  @media all and (max-width: 1330px) {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    height: 75%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 15px 1px #a6a6a6;
  }
`;

const ResetItemPrice = styled.button`
  border: none;
  background-color: transparent;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 30px;
  cursor: pointer;

  @media all and (max-width: 1330px) {
    font-weight: 400;
    font-size: 18px;
    height: 20%;
    margin-bottom: 0;
  }

  @media all and (max-width: 728px) {
    font-size: 16px;
  }

  @media all and (max-width: 420px) {
    font-size: 13px;
  }
`;

const ItemPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  hr {
    width: 80%;
  }

  @media all and (max-width: 1330px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0;

    height: 20%;

    hr {
      display: none;
    }
  }
`;

const ItemPrice = styled.button`
  font-size: 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-bottom: -6px;

  ${({ luxuryPriceRange, currentPriceRange }) =>
    luxuryPriceRange === currentPriceRange &&
    css`
      color: #ffd700;
      font-size: 17px;
      margin-bottom: -8px;
    `}

  @media all and (max-width: 1330px) {
    font-size: 18px;
    margin-bottom: 0;

    ${({ luxuryPriceRange, currentPriceRange }) =>
      luxuryPriceRange === currentPriceRange &&
      css`
        color: #ffd700;
        font-size: 18px;
        margin-bottom: 0px;
      `}
  }

  @media all and (max-width: 728px) {
    font-size: 16px;
  }

  @media all and (max-width: 420px) {
    font-size: 13px;
  }
`;

const ItemRatingContainer = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media all and (max-width: 1330px) {
    height: 75%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 15px 1px #a6a6a6;
    justify-content: space-evenly;
  }
`;

const ItemRatingWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  hr {
    width: 100%;
    margin-top: 3px;
  }

  @media all and (max-width: 1330px) {
    hr {
      display: none;
    }
  }
`;

const ItemRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: ${({ luxuryRating, currentRating }) =>
    luxuryRating === currentRating ? "700" : "default"};

  @media all and (max-width: 420px) {
    font-size: 10px;
  }
`;
