import { useEffect, useState } from 'react';

/**
 * usePaginate (custom hook) - used to paginate data
 *
 * @param {number} page - initial page number
 * @param {number} pageSize - number of items per page
 * @param {number} totalRows - number of data rows in DB
 * @param {(page, pageSize) => void} onChangePage - callback function to change page (eg: dispatch(getData(page, pageSize)))
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
export default function usePaginate(page, pageSize, totalRows, onChangePage) {
  const [currentPage, setCurrentPage] = useState(page);
  const minPage = 1
  const maxPage = Math.ceil(totalRows / pageSize)

  /**
 * ValueInRange make sure a number is in a range
 * 
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return value is already in range
 */
  const valueInRange = (value, min, max) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  useEffect(() => {
    const current = valueInRange(currentPage, 1, maxPage)
    setCurrentPage(current)
    onChangePage(current, pageSize); // call api
  }, [currentPage, pageSize]);

  const prev = () => {
    if (currentPage > minPage) {
      setCurrentPage(currentPage - 1)
    }
  };

  const next = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const breakPrev = () => {
    if (currentPage - 5 > minPage) {
      setCurrentPage(currentPage - 5)
    }
  }

  const breakNext = () => {
    if (currentPage + 5 < maxPage) {
      setCurrentPage(currentPage + 5)
    }
  }

  const jumpPrev = () => {
    if (currentPage - 10 < maxPage) {
      setCurrentPage(currentPage - 10)
    }
  }

  const jumpNext = () => {
    if (currentPage + 10 > maxPage) {
      setCurrentPage(currentPage + 10)
    }
  }

  return [
    currentPage,
    goToPage,
    prev,
    next,
    breakPrev,
    breakNext,
    jumpPrev,
    jumpNext,
  ];
}