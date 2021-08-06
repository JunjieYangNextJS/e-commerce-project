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
        setLuxuryPriceRange(a);
        break;
      case 1:
        setLuxuryPriceRange(b);
        break;
      case 2:
        setLuxuryPriceRange(c);
        break;
      case 3:
        setLuxuryPriceRange(d);
        break;
    }
  };

  return (
    <FilterSidebarContainer>
      <ItemPriceContainer>
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
  height: 900px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemPriceContainer = styled.div``;

const ItemPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
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
    background-color: black;
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
  font-size: 14px;
`;
