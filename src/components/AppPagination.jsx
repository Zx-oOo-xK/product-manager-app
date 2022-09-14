import { CPagination, CPaginationItem } from '@coreui/react';
import React, { useState } from 'react';

export default function AppPagination({
  activePage,
  pages,
  prev,
  next,
  goToPage,
  maxDisplayNodePagination,
}) {
  const list = Array.from({ length: pages }, (_, i) => i + 1);
  const cursorPointer = { cursor: 'pointer' };
  const [offset, setOffset] = useState(0);
  const show = list.slice(offset, offset + maxDisplayNodePagination);

  return (
    <CPagination>
      <CPaginationItem
        onClick={() => {
          prev();
          if (offset && activePage < offset + 1 + maxDisplayNodePagination / 2)
            setOffset(offset - 1);
        }}
        style={cursorPointer}
      >
        prev
      </CPaginationItem>
      {show.map((item) => (
        <CPaginationItem
          key={item}
          active={activePage === item}
          onClick={() => goToPage(item)}
          style={cursorPointer}
        >
          {item}
        </CPaginationItem>
      ))}
      <CPaginationItem
        onClick={() => {
          next();
          if (
            maxDisplayNodePagination + offset < pages &&
            activePage + 1 > maxDisplayNodePagination / 2 + offset + 1
          )
            setOffset(activePage - 2);
        }}
        style={cursorPointer}
      >
        next
      </CPaginationItem>
    </CPagination>
  );
}
