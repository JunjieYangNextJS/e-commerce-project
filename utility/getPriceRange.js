import { priceRangeArray } from "./../components/FilterSidebarElements";

export const getPriceRange = (priceRange, filteredByRating) => {
  switch (priceRange) {
    case priceRangeArray[0]:
      return filteredByRating.filter((luxury) => luxury.product.price < 500);
    case priceRangeArray[1]:
      return filteredByRating.filter(
        (luxury) => luxury.product.price >= 500 && luxury.product.price < 1000
      );
    case priceRangeArray[2]:
      return filteredByRating.filter(
        (luxury) => luxury.product.price >= 1000 && luxury.product.price < 2000
      );
    case priceRangeArray[3]:
      return filteredByRating.filter((luxury) => luxury.product.price >= 2000);
    default:
      return null;
  }
};
