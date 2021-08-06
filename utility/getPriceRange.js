export const getPriceRange = (priceRange, filteredByRating) => {
  switch (priceRange) {
    case "a":
      return filteredByRating.filter((luxury) => luxury.product.price < 500);
    case "b":
      return filteredByRating.filter(
        (luxury) => luxury.product.price >= 500 && luxury.product.price < 1000
      );
    case "c":
      return filteredByRating.filter(
        (luxury) => luxury.product.price >= 1000 && luxury.product.price < 1500
      );
    case "d":
      return filteredByRating.filter((luxury) => luxury.product.price > 1500);
    default:
      return null;
  }
};
