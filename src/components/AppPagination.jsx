import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function AppPagination({
  itemsPerPage,
  data,
  pageRangeDisplayed,
  nextLabel,
  previousLabel,
  sliceItem,
}) {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + parseInt(itemsPerPage, 10);
    sliceItem(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = Math.ceil((event.selected * itemsPerPage) % data.length);
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      onPageChange={handlePageClick}
      nextLabel={nextLabel}
      previousLabel={previousLabel}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={0}
      pageCount={pageCount}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
  );
}
