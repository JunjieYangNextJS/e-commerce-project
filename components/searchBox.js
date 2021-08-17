import React from "react";
import styled from "styled-components";

const SearchBox = ({ value, onChange }) => {
  return (
    <SearchBoxInput
      type="text"
      name="query"
      placeholder="Search here..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;

const SearchBoxInput = styled.input`
  width: 600px;
  height: 30px;
  border: none;
  outline: none;
`;
