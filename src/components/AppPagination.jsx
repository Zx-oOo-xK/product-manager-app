import React from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

/**
 * PaginationNode display node for pagination
 *
 * @param {number[]} - list of pagination's node values
 * @param {number} - activePage is current page position
 * @param {function} - goToPage is function to change page
 * @return row of page number buttons in pagination
 */
export function PaginationNode({ nodes, activePage, goToPage }) {
  return (
    <>
      {nodes.map((item) => (
        <CPaginationItem
          key={JSON.stringify(item)}
          active={activePage === item}
          onClick={() => goToPage(item)}
        >
          {item}
        </CPaginationItem>
      ))}
    </>
  );
}

/**
 * ValueInRange make sure a number is in a range
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return value is already in range
 */
function ValueInRange(value, min, max) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * AppPagination is component pagination
 *
 * @param {number} activePage is current active page
 * @param {number} pages is number of active pages
 * @param {number} maxDisplayNodePagination is maximum display node pagination
 * @param {function} prev is the previous page
 * @param {function} next is the next page
 * @param {function} goToPage is the change page
 * @param {function} breakPrev is previous page with 5 node pagination
 * @param {function} breakNext is next page with 5 node pagination
 * @param {function} jumpPrev is previous page with 10 node pagination
 * @param {function} jumpNext is next page with 10 node pagination
 * @returns component pagination
 */
export default function AppPagination({
  activePage,
  pages,
  maxDisplayNodePagination,
  prev,
  next,
  goToPage,
  breakPrev,
  breakNext,
  jumpPrev,
  jumpNext,
}) {
  const offset = ValueInRange(activePage - 3, 0, pages - maxDisplayNodePagination + 1);
  const displayBreakPrev = offset > 0;
  const displayBreakNext = offset < pages - maxDisplayNodePagination;
  const list = Array.from({ length: pages }, (_, i) => i + 1);
  const nodePagination = list.slice(offset, offset + maxDisplayNodePagination);
  const labelPrev = <FontAwesomeIcon icon={solid('angle-left')} />;
  const labelNext = <FontAwesomeIcon icon={solid('angle-right')} />;
  const labelBreakPrev = <FontAwesomeIcon icon={solid('ellipsis')} />;
  const labelBreakNext = <FontAwesomeIcon icon={solid('ellipsis')} />;
  const labelJumpPrev = <FontAwesomeIcon icon={solid('angles-left')} />;
  const labelJumpNext = <FontAwesomeIcon icon={solid('angles-right')} />;

  return (
    <CPagination>
      <CPaginationItem onClick={jumpPrev}>{labelJumpPrev}</CPaginationItem>
      <CPaginationItem onClick={prev}>{labelPrev}</CPaginationItem>
      {displayBreakPrev && <CPaginationItem onClick={breakPrev}>{labelBreakPrev}</CPaginationItem>}
      <PaginationNode nodes={nodePagination} activePage={activePage} goToPage={goToPage} />
      {displayBreakNext && <CPaginationItem onClick={breakNext}>{labelBreakNext}</CPaginationItem>}
      <CPaginationItem onClick={next} role="button">
        {labelNext}
      </CPaginationItem>
      <CPaginationItem onClick={jumpNext}>{labelJumpNext}</CPaginationItem>
    </CPagination>
  );
}
