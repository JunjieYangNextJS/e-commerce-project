import React from "react";
import FilterSidebarElements from "./FilterSidebarElements";

function RingsSideBar({ setRingsStarRating }) {
  return (
    <FilterSidebarElements
      setLuxuryRating={setRingsStarRating}
      setLuxuryPriceRange={setRingsPriceRange}
    />
  );
}

export default RingsSideBar;
