import React from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';

/**
 * PaginationNode display node for pagination
 * 
 * @param {number[]} - list of pagination's node values
 * @param {number} - activePage is current page position
 * @param {function} - goToPage is function to change page
 * @return row of page number buttons in pagination
 */
export function PaginationNode({ nodes, activePage, goToPage }) {
  return <>{
    nodes.map((item) => (
      <CPaginationItem
        key={JSON.stringify(item)}
        active={activePage === item}
        onClick={() => goToPage(item)}
      >
        {item}
      </CPaginationItem>
    ))
  }</>
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
  const displayBreakPrev = offset > 0
  const displayBreakNext = offset < pages - maxDisplayNodePagination
  const list = Array.from({ length: pages }, (_, i) => i + 1);
  const nodePagination = list.slice(offset, offset + maxDisplayNodePagination);
  const labelPrev = 'prev'
  const labelNext = 'next'
  const labelBreakPrev = '...'
  const labelBreakNext = '...'
  const labelJumpPrev = '<<'
  const labelJumpNext = '>>'

  return (
    <CPagination>
      <CPaginationItem onClick={jumpPrev}>{labelJumpPrev}</CPaginationItem>
      <CPaginationItem onClick={prev}>{labelPrev}</CPaginationItem>
      {displayBreakPrev && <CPaginationItem onClick={breakPrev}>{labelBreakPrev}</CPaginationItem>}
      <PaginationNode nodes={nodePagination} activePage={activePage} goToPage={goToPage} />
      {displayBreakNext && <CPaginationItem onClick={breakNext}>{labelBreakNext}</CPaginationItem>}
      <CPaginationItem onClick={next}>{labelNext}</CPaginationItem>
      <CPaginationItem onClick={jumpNext}>{labelJumpNext}</CPaginationItem>
    </CPagination>
  );
}
