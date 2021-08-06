import React, { useState } from "react";
import styled from "styled-components";
import StarIcon from "@material-ui/icons/Star";
import ReactStars from "react-rating-stars-component";

function FilterSidebarElements({ setLuxuryRating, setLuxuryPriceRange }) {
  // handle rating
  const ratingArray = [4, 3, 2, 1];

  const changeRating = (rating) => {
    setLuxuryRating(rating);
  };

  // handle price
  const priceRangeArray = [
    "Under $500",
    "$500 to $1000",
    "$1500 to $2000",
    "Above $2000",
  ];

  const changePriceRange = (index) => {
    switch (index) {
      case 0:
        setLuxuryPriceRange("a");
        break;
      case 1:
        setLuxuryPriceRange("b");
        break;
      case 2:
        setLuxuryPriceRange("c");
        break;
      case 3:
        setLuxuryPriceRange("d");
        break;
    }
  };

  const resetPriceRange = () => {
    setLuxuryPriceRange("");
  };

  return (
    <FilterSidebarContainer>
      <ItemPriceContainer>
        <ResetItemPrice onClick={resetPriceRange}>
          Reset Price Range
        </ResetItemPrice>
        {priceRangeArray.map((range, index) => (
          <ItemPriceWrapper key={index}>
            <ItemPrice onClick={() => changePriceRange(index)}>
              {range}
            </ItemPrice>
            <hr />
          </ItemPriceWrapper>
        ))}
      </ItemPriceContainer>
      <ItemRatingContainer>
        {ratingArray.map((n) => (
          <ItemRatingWrapper key={n}>
            <ItemRating onClick={() => changeRating(n)}>
              <ReactStars count={n} size={24} color="#ffd700" /> & Up
            </ItemRating>
            <hr />
          </ItemRatingWrapper>
        ))}
      </ItemRatingContainer>
    </FilterSidebarContainer>
  );
}

export default FilterSidebarElements;

const FilterSidebarContainer = styled.div`
  width: 12vw;
  background: #a6a6a6;
  height: 899px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 150px;
`;

const ItemPriceContainer = styled.div`
  margin-top: -100px;
`;

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
    width: 100%;
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
`;

const ItemRatingContainer = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  hr {
    width: 100%;
    margin-top: 3px;
  }
`;

const ItemRatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
`;
