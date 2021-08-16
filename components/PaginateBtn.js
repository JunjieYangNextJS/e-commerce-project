import React, { useState } from "react";
import styled from "styled-components";
import { paginate } from "../utility/paginate";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const PaginateBtn = ({ currentPage, pageNumberArray, setCurrentPage }) => {
  const [slicedPageNumberArray, setSlicedPageNumberArray] = useState(1);
  const slicedPageNumberSize = 3;

  const pageNumberEachSlice = paginate(
    pageNumberArray,
    slicedPageNumberArray,
    slicedPageNumberSize
  );

  const onSlicedPageNumberChange = () => {
    setSlicedPageNumberArray(slicedPageNumberArray + 1);
  };

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
      <PreviousButton currentPage={currentPage} onClick={goToPreviousPage}>
        <ArrowLeftIcon style={{ fontSize: 32 }} />
      </PreviousButton>

      <ButtonWrapper>
        {pageNumberArray.length !== 1 &&
          pageNumberEachSlice.map((page) => (
            <PageButton
              key={page}
              page={page}
              currentPage={currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PageButton>
          ))}
        <PageButton onClick={onSlicedPageNumberChange}>...</PageButton>
      </ButtonWrapper>

      <NextButton
        currentPage={currentPage}
        pageNumberArrayLength={pageNumberArray.length}
        onClick={goToNextPage}
      >
        <ArrowRightIcon style={{ fontSize: 32 }} />
      </NextButton>
    </ButtonContainer>
  );
};

export default PaginateBtn;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  height: 10px;
  width: 100px;
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
  border-color: ${({ currentPage, page }) =>
    currentPage === page ? "#e77600" : "#fff"};
`;

const PreviousButton = styled.div`
  display: grid;
  align-content: center;
  visibility: ${({ currentPage }) =>
    currentPage === 1 ? "hidden" : "default"};
`;
const NextButton = styled.div`
  display: grid;
  align-content: center;
  visibility: ${({ currentPage, pageNumberArrayLength }) =>
    currentPage >= pageNumberArrayLength ? "hidden" : "default"};
`;
