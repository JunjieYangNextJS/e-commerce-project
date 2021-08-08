import React from "react";
import FilterSidebarElements from "./FilterSidebarElements";

function EarringsSideBar({ setEarringsStarRating, setEarringsPriceRange }) {
  return (
    <FilterSidebarElements
      setLuxuryRating={setEarringsStarRating}
      setLuxuryPriceRange={setEarringsPriceRange}
    />
  );
}

export default EarringsSideBar;
