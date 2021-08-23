import React, { useState } from "react";
import styled from "styled-components";
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
  setLuxuryPriceRange,
  setLuxuryCurrentPage,
}) {
  // handle rating change
  const ratingArray = [4, 3, 2, 1];

  const changeRating = (rating) => {
    setLuxuryRating(rating);
    setLuxuryCurrentPage(1);
  };

  // handle price range change
  const changePriceRange = (range) => {
    setLuxuryPriceRange(range);
    setLuxuryCurrentPage(1);
  };

  const resetPriceRange = () => {
    setLuxuryPriceRange("");
    setLuxuryCurrentPage(1);
  };

  return (
    <FilterSidebarContainer>
      <FilterSidebarWrapper>
        <ItemPriceContainer>
          <ResetItemPrice onClick={resetPriceRange}>
            Reset Price Range
          </ResetItemPrice>
          {priceRangeArray.map((range, index) => (
            <ItemPriceWrapper key={index}>
              <ItemPrice onClick={() => changePriceRange(range)}>
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
  height: auto;
  position: relative;
`;

const FilterSidebarWrapper = styled.div`
  position: sticky;
  top: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 150px;
`;

const ItemPriceContainer = styled.div``;

const ResetItemPrice = styled.button`
  border: none;
  background-color: transparent;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 30px;
  cursor: pointer;
`;

const ItemPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  hr {
    width: 80%;
  }
`;

const ItemPrice = styled.button`
  font-size: 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-bottom: -6px;

  :focus {
    color: #ffd700;
    font-size: 17px;
    margin-bottom: -8px;
  }

  @media all and (max-width: 1330px) {
    font-size: 14px;
    :focus {
      font-size: 14px;
      margin-bottom: -6px;
    }
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
`;

const ItemRatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  hr {
    width: 100%;
    margin-top: 3px;
  }
`;

const ItemRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: ${({ luxuryRating, currentRating }) =>
    luxuryRating === currentRating ? "700" : "default"};
`;
