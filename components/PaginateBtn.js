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
}) => {
  // paginating the pagination bar and displaying 3 pages at a time
  const [slicedPaginationBar, setSlicedPaginationBar] = useState(1);
  const numberOfPagesPerSlice = 3;

  let allSlicedPaginationBars = [];
  for (
    let i = 1;
    i <= Math.ceil(pageNumberArray.length / numberOfPagesPerSlice);
    i++
  )
    allSlicedPaginationBars.push(i);

  const renderedPagesPerSlice = paginate(
    pageNumberArray,
    slicedPaginationBar,
    numberOfPagesPerSlice
  );

  const goToNextSlicedPaginationBar = () => {
    setCurrentPage(slicedPaginationBar * numberOfPagesPerSlice + 1);
    setSlicedPaginationBar(slicedPaginationBar + 1);
    window.scrollTo(0, 0);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const goToPreviousPage = () => {
    if (currentPage % numberOfPagesPerSlice === 1) {
      setSlicedPaginationBar(slicedPaginationBar - 1);
    }
    setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  const goToNextPage = () => {
    if (currentPage % numberOfPagesPerSlice === 0) {
      setSlicedPaginationBar(slicedPaginationBar + 1);
    }
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  // update three states after the last page-item gets deleted
  useEffect(() => {
    if (deleteLastPageItem) {
      goToPreviousPage();
      setDeleteLastPageItem(false);
    }
  }, [deleteLastPageItem]);

  return (
    <ButtonContainer>
      <PreviousButton currentPage={currentPage} onClick={goToPreviousPage}>
        <ArrowLeftIcon style={{ fontSize: 32 }} />
      </PreviousButton>

      <PageButtonsWrapper>
        {pageNumberArray.length !== 1 &&
          renderedPagesPerSlice.map((page) => (
            <PageButton
              key={page}
              page={page}
              currentPage={currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PageButton>
          ))}
        <GoToNextSliceButton
          allSlicedPaginationBars={allSlicedPaginationBars}
          slicedPaginationBar={slicedPaginationBar}
          onClick={goToNextSlicedPaginationBar}
        >
          ...
        </GoToNextSliceButton>
      </PageButtonsWrapper>

      <NextButton
        currentPage={currentPage}
        pageNumberArray={pageNumberArray}
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

const PageButtonsWrapper = styled.div`
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

const GoToNextSliceButton = styled.button`
  font-size: 14px;
  padding: 5px 6px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 3px;
  border-color: #fff;
  display: ${({ slicedPaginationBar, allSlicedPaginationBars }) =>
    slicedPaginationBar >= allSlicedPaginationBars.length ? "none" : "default"};
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
  visibility: ${({ currentPage, pageNumberArray }) =>
    currentPage >= pageNumberArray.length ? "hidden" : "default"};
`;
