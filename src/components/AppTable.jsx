import React, { useCallback, useState } from 'react';
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
import { cilArrowBottom, cilArrowTop, cilSwapVertical } from '@coreui/icons';
import { changeSortTable } from 'app/statusSlice';
import { useDispatch } from 'react-redux';

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
          <CTableDataCell key={`${col.key}_${data.id}`} className="table-row">
            {col.render ? col.render(data) : data[col.dataIndex]}
          </CTableDataCell>
        ))}
      </CTableRow>
    );
  };
}

function IconSort({ sortType }) {
  switch (sortType) {
    case 'asc':
      return <CIcon icon={cilArrowBottom} />;
    case 'desc':
      return <CIcon icon={cilArrowTop} />;
    case '':
      return <CIcon icon={cilSwapVertical} />;
    default:
      return null;
  }
}

/**
 * AppTableHead is a table header cell
 *
 * @param {bool} title - is title of the header cell
 * @param {bool} sorter - is a boolean indicating whether the header cells should be sorted
 * @returns
 */
function AppTableHead({ title, sorter, isLoading, nameSorter }) {
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState('desc');
  const handleSetSortType = () => {
    switch (sortType) {
      case '':
        setSortType('asc');
        break;
      case 'asc':
        setSortType('desc');
        break;
      case 'desc':
        setSortType('');
        break;
      default:
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>{title}</div>
      {sorter && (
        <CButton
          disabled={isLoading}
          onClick={() => {
            handleSetSortType();
            dispatch(changeSortTable({ name: nameSorter, type: sortType }));
          }}
        >
          <IconSort sortType={sortType} />
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
              <CTableHeaderCell scope="col" key={col.key} className="table-header-cell">
                <AppTableHead
                  title={col.title}
                  sorter={col.sorter}
                  isLoading={isLoading}
                  nameSorter={col.dataIndex}
                />
              </CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {isLoading ? (
            <CTableRow>
              {columns.map((col) => (
                <CTableDataCell key={JSON.stringify(col.dataIndex)} style={{ background: '#fff' }}>
                  <SkeletonTheme baseColor="#ddd" highlightColor="#ccc">
                    <Skeleton style={{ width: '100%' }} />
                    <Skeleton style={{ width: '75%' }} />
                    <Skeleton style={{ width: '50%' }} />
                    <Skeleton style={{ width: '75%' }} />
                    <Skeleton style={{ width: '50%' }} />
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
