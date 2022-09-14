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
 */
export default function usePaginate(page, pageSize, totalRows, onChangePage) {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    onChangePage(currentPage, pageSize); // call api
  }, [currentPage, pageSize]);

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    const totalPage = Math.ceil(totalRows / pageSize);
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return [currentPage, goToPage, prev, next];
}
