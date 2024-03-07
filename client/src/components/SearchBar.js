import React from "react";
import CostType from "./filters/CostType";
import PropertyType from "./filters/PropertyType";
import PriceSlider from "./filters/PriceSlider";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="search-bar-div">
        <PriceSlider />
      </div>
      <div className="search-bar-div">
        <CostType />
      </div>
      <div className="search-bar-div">
        <PropertyType />
      </div>
    </div>
  );
};

export default SearchBar;
