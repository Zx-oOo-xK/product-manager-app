import { useState } from 'react';

/**
 * usePaginate (custom hook) - used to paginate data
 *
 * @param {number} page - initial page number
 * @param {number} pageSize - number of items per page
 * @param {number} totalRows - number of data rows in DB
 * @returns [currentPage, goToPage, prev, next] properties:
 * - current page number
 * - goToPage function
 * - prev page function
 * - next page function
 * - breakPrev function
 * - breakNext function
 * - jumpPrev function
 * - jumpNext function
 */
export default function usePaginate(page, pageSize, totalRows) {
  const [currentPage, setCurrentPage] = useState(page);
  const minPage = 1;
  const maxPage = Math.ceil(totalRows / pageSize);

  const validPage = (value) => {
    if (value < minPage || value > maxPage) {
      return false;
    }
    return true;
  };

  const prev = () => {
    if (validPage(currentPage - 1)) {
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    if (validPage(currentPage + 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageNum) => {
    if (validPage(pageNum)) {
      setCurrentPage(pageNum);
    }
  };

  const breakPrev = () => {
    if (validPage(currentPage - 5)) {
      setCurrentPage(currentPage - 5);
    }
  };

  const breakNext = () => {
    if (validPage(currentPage + 5)) {
      setCurrentPage(currentPage + 5);
    }
  };

  const jumpPrev = () => {
    if (validPage(currentPage - 10)) {
      setCurrentPage(currentPage - 10);
    }
  };

  const jumpNext = () => {
    if (validPage(currentPage + 10)) {
      setCurrentPage(currentPage + 10);
    }
  };

  return [currentPage, goToPage, prev, next, breakPrev, breakNext, jumpPrev, jumpNext];
}
