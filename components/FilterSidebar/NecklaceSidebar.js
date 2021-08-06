import React from "react";
import FilterSidebarElements from "./FilterSidebarElements";

function NecklaceSideBar({ setNecklaceStarRating, setNecklacePriceRange }) {
  return (
    <FilterSidebarElements
      setLuxuryRating={setNecklaceStarRating}
      setLuxuryPriceRange={setNecklacePriceRange}
    />
  );
}

export default NecklaceSideBar;
