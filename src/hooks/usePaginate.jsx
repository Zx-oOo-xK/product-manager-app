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
  const [current, setCurrent] = useState(currentPage)

  useEffect(() => {
    const p1 = valueInRange(current, minPage, maxPage)
    setCurrent(p1)
    if (p1 !== currentPage || pageSize) {
      setCurrentPage(p1)
      onChangePage(p1, pageSize)
    }
  }, [current, pageSize]);

  const prev = () => {
    setCurrent(current - 1)
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const goToPage = (pageNum) => {
    setCurrent(pageNum);
  };

  const breakPrev = () => {
    setCurrent(current - 5)
  }

  const breakNext = () => {
    setCurrent(current + 5)
  }

  const jumpPrev = () => {
    setCurrent(current - 10)
  }

  const jumpNext = () => {
    setCurrent(current + 10)
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