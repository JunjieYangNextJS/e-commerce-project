import React from "react";
import styled from "styled-components";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const PaginateBtn = ({ currentPage, pageNumberArray, setCurrentPage }) => {
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <ButtonContainer>
      {/* {currentPage !== 1 && (
        <PreviousButton onClick={goToPreviousPage}>
          <ArrowLeftIcon style={{ fontSize: 32 }} />
        </PreviousButton>
      )} */}
      <ButtonWrapper>
        {pageNumberArray.length !== 1 &&
          pageNumberArray.map((page) => (
            <PageButton key={page} onClick={() => onPageChange(page)}>
              {page}
            </PageButton>
          ))}
      </ButtonWrapper>

      {/* {currentPage !== pageNumberArray.length && (
        <NextButton onClick={goToNextPage}>
          <ArrowRightIcon style={{ fontSize: 32 }} />
        </NextButton>
      )} */}
    </ButtonContainer>
  );
};

export default PaginateBtn;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  height: 10px;
  width: auto;
  gap: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageButton = styled.button`
  font-size: 14px;
  padding: 5px 8px;
  border: 1px solid black;
  border-radius: 3px;

  :focus {
    border-color: #e77600;
  }
`;

const PreviousButton = styled.div``;
const NextButton = styled.div``;
