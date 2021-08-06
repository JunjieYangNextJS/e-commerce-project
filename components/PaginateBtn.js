import React from "react";
import styled from "styled-components";

const PaginateBtn = ({ pageNumberArray, setCurrentPage }) => {
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <ButtonWrapper>
      {pageNumberArray.map((page) => (
        <PageButton key={page} onClick={() => onPageChange(page)}>
          {page}
        </PageButton>
      ))}
    </ButtonWrapper>
  );
};

export default PaginateBtn;

export const ButtonWrapper = styled.div`
  height: 10px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageButton = styled.button`
  font-size: 30px;
  color: red;
`;
