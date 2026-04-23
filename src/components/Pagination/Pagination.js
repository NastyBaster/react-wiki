import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageNumber, info, setPageNumber }) => {
  let pageChange = (data) => {
    setPageNumber(data.selected + 1);
  };

  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <>
      <style>
        {`
          a {
            color: white;
            text-decoration: none;
          }
          @media (max-width: 768px) {
            .pagination { font-size: 12px; }
            .next, .prev { display: none; }
          }
        `}
      </style>

      <ReactPaginate
        forcePage={pageNumber > (info?.pages || 1) ? 0 : pageNumber - 1}
        marginPagesDisplayed={width < 576 ? 1 : 2}
        pageRangeDisplayed={width < 576 ? 1 : 2}
        pageCount={info?.pages ? info.pages: 1}
        onPageChange={pageChange}
        className="pagination justify-content-center my-4 gap-4"
        nextLabel="Next"
        previousLabel="Prev"
        previousClassName="btn btn-primary fs-5 prev"
        nextClassName="btn btn-primary fs-5 next"
        activeClassName="active"
        pageClassName="page-item"
        pageLinkClassName="page-link"
      />
    </>
  );
};

export default Pagination;
