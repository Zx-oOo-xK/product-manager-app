import { CPagination, CPaginationItem } from '@coreui/react';
import React, { useState } from 'react';

export default function AppPagination({
  activePage,
  pages,
  setActivePage,
  maxDisplayNodePagination,
}) {
  const list = Array.from({ length: pages }, (_, i) => i + 1);
  const next = () => (activePage + 1 > pages ? activePage : activePage + 1);
  const prev = () => (activePage - 1 < 1 ? activePage : activePage - 1);
  const cursorPointer = { cursor: 'pointer' };
  const [offset, setOffset] = useState(0);
  const show = list.slice(offset, offset + maxDisplayNodePagination);

  return (
    <CPagination>
      <CPaginationItem
        onClick={() => {
          setActivePage(prev);
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
          onClick={() => setActivePage(item)}
          style={cursorPointer}
        >
          {item}
        </CPaginationItem>
      ))}
      <CPaginationItem
        onClick={() => {
          setActivePage(next);
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
