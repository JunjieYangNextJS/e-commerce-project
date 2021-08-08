import React from "react";
import FilterSidebarElements from "./FilterSidebarElements";

function BraceletSidebar({ setBraceletStarRating, setBraceletPriceRange }) {
  return (
    <FilterSidebarElements
      setLuxuryRating={setBraceletStarRating}
      setLuxuryPriceRange={setBraceletPriceRange}
    />
  );
}

export default BraceletSidebar;
