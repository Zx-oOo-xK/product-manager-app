/* eslint-disable no-unused-vars */
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import React from 'react';

/**
 * withColumns a function that return a table-row component
 *
 * @param {columns} cols - an array of columns {key, dataIndex, title}
 * @returns table row component (data must have id)
 */
export function withColumns(cols) {
  // eslint-disable-next-line func-names
  return function ({ data }) {
    // eslint-disable-next-line no-console
    console.log(data);
    return (
      <CTableRow>
        {cols.map((col) => (
          <CTableDataCell key={`${col.key}_${data.id}`}>
            {col.render ? col.render(data) : data[col.dataIndex]}
          </CTableDataCell>
        ))}
      </CTableRow>
    );
  };
}

// render?: (
//   value: any,
//   record: RecordType,
//   index: number,
// ) => React.ReactNode | RenderedCell<RecordType>;

export default function AppTable({ dataSource, columns }) {
  const AppRow = withColumns(columns);

  return (
    <div>
      <CTable className="table table-dark table-hover table-striped table-responsive">
        <CTableHead className="text-light bg-dark">
          <CTableRow>
            {columns.map((col) => (
              <CTableHeaderCell scope="col" key={col.key}>
                {col.title}
              </CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {dataSource.map((data) => (
            <AppRow key={`row_${data.id}`} data={data} />
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
}
