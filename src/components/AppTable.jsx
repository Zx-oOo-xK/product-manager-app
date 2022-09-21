import React, { useCallback } from 'react';
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import './Style/style.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import CIcon from '@coreui/icons-react';
import { cilSwapVertical } from '@coreui/icons';

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

/**
 * AppTableHead is a table header cell
 *
 * @param {bool} title - is title of the header cell
 * @param {bool} sorter - is a boolean indicating whether the header cells should be sorted
 * @returns
 */
function AppTableHead({ title, sorter, isLoading }) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>{title}</div>
      {sorter && (
        <CButton disabled={isLoading}>
          <CIcon icon={cilSwapVertical} />
        </CButton>
      )}
    </div>
  );
}

/**
 * AppTable is a table that displays data
 *
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
                className="p-3 align-middle"
                style={{ background: 'linear-gradient(to bottom, #8E2DE2, #4A00E0)' }}
              >
                <AppTableHead title={col.title} sorter={col.sorter} isLoading={isLoading} />
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
                  style={{ background: '#0d003d' }}
                >
                  <SkeletonTheme baseColor="#0d007d" highlightColor="#0d005d">
                    <Skeleton count={3} style={{ width: '100%' }} />
                  </SkeletonTheme>
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
