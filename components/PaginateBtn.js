import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { paginate } from "../utility/paginate";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const PaginateBtn = ({
  currentPage,
  pageNumberArray,
  setCurrentPage,
  deleteLastPageItem,
  setDeleteLastPageItem,
  cartItemsEachPage,
  cartItems,
}) => {
  const [slicedPageNumberArray, setSlicedPageNumberArray] = useState(1);
  const slicedPageNumberSize = 3;

  let allPageNumberSlicesArray = [];
  for (
    let i = 1;
    i <= Math.ceil(pageNumberArray.length / slicedPageNumberSize);
    i++
  )
    allPageNumberSlicesArray.push(i);

  const pageNumberEachSlice = paginate(
    pageNumberArray,
    slicedPageNumberArray,
    slicedPageNumberSize
  );

  const onSlicedPageNumberChange = () => {
    setCurrentPage(slicedPageNumberArray * 3 + 1);
    setSlicedPageNumberArray(slicedPageNumberArray + 1);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage % 3 === 1) {
      setSlicedPageNumberArray(slicedPageNumberArray - 1);
    }
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage % 3 === 0) {
      setSlicedPageNumberArray(slicedPageNumberArray + 1);
    }
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (
      deleteLastPageItem &&
      cartItemsEachPage.length === 1 &&
      cartItems.length !== 1
    ) {
      goToPreviousPage();
      setDeleteLastPageItem(false);
    }
  }, [deleteLastPageItem]);

  return (
    <ButtonContainer>
      <PreviousButton
        currentPage={currentPage}
        onClick={() => goToPreviousPage(currentPage)}
      >
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
        <SwitchPageButton
          currentPage={currentPage}
          allPageNumberSlicesArray={allPageNumberSlicesArray}
          slicedPageNumberArray={slicedPageNumberArray}
          onClick={onSlicedPageNumberChange}
        >
          ...
        </SwitchPageButton>
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
  width: auto;
  gap: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageButton = styled.button`
  font-size: 14px;
  cursor: pointer;
  padding: 5px 8px;
  border: 1px solid black;
  border-radius: 3px;
  border-color: ${({ currentPage, page }) =>
    currentPage === page ? "#e77600" : "#fff"};
`;

const SwitchPageButton = styled.button`
  font-size: 14px;
  padding: 5px 6px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 3px;
  border-color: #fff;
  display: ${({ slicedPageNumberArray, allPageNumberSlicesArray }) =>
    slicedPageNumberArray >= allPageNumberSlicesArray.length
      ? "none"
      : "default"};
`;

const PreviousButton = styled.div`
  display: grid;
  align-content: center;
  cursor: pointer;
  visibility: ${({ currentPage }) =>
    currentPage === 1 ? "hidden" : "default"};
`;
const NextButton = styled.div`
  display: grid;
  align-content: center;
  cursor: pointer;
  visibility: ${({ currentPage, pageNumberArrayLength }) =>
    currentPage >= pageNumberArrayLength ? "hidden" : "default"};
`;
