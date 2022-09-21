import React, { useCallback } from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import './Style/style.scss';
import Skeleton from 'react-loading-skeleton';

/**
 * withColumns a function that return a table-row component
 *
 * @param {Object} cols - a list of columns, with column have properties:
 * - key: unique key of column
 * - dataIndex: key of data
 * - title: title of column
 * - render?: ({ value, record, index }) => React.ReactNode
 * @returns a simple component that render a CTableRow
 */
export function withColumns(cols) {
  return function TableRowWithColumns({ data }) {
    return (
      <CTableRow>
        {cols.map((col) => (
          <CTableDataCell
            key={`${col.key}_${data.id}`}
            className="align-middle"
            style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
          >
            {col.render ? col.render(data) : data[col.dataIndex]}
          </CTableDataCell>
        ))}
      </CTableRow>
    );
  };
}

// TODO: add loading to load data table

/**
 * @param {Object[]} dataSource - a list of data rows, each row must have an id
 * @param {Object[]} columns - a list of columns, with column have properties:
 * - key: unique key of column
 * - dataIndex: key of data
 * - title: title of column
 * - render?: ({ value, record, index }) => React.ReactNode
 * @return {CTable} CTable instance
 */
export default function AppTable({ dataSource, columns, isLoading }) {
  const AppRow = useCallback(withColumns(columns, isLoading), [columns]);

  return (
    <div className="AppTable">
      <CTable className="table-hover">
        <CTableHead className="text-light">
          <CTableRow>
            {columns.map((col) => (
              <CTableHeaderCell
                scope="col"
                key={col.key}
                className="p-3"
                style={{ background: 'linear-gradient(to bottom, #8E2DE2, #4A00E0)' }}
              >
                {col.title}
              </CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {isLoading ? (
            <CTableRow>
              {columns.map((col) => (
                <CTableDataCell
                  key={JSON.stringify(col.dataIndex)}
                  style={{ backgroundColor: 'transparent' }}
                >
                  <Skeleton count={3} style={{ padding: '20px', width: '100%' }} />
                </CTableDataCell>
              ))}
            </CTableRow>
          ) : (
            dataSource.map((data) => <AppRow key={`row_${data.id}`} data={data} />)
          )}
        </CTableBody>
      </CTable>
    </div>
  );
}
