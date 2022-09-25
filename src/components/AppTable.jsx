import React, { useEffect, useCallback, useState } from 'react';
import {
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

function TableSkeleton({ columns }) {
  return (
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
  );
}

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

/**
 * AppTableHead is a table header cell
 *
 * @param {bool} title - is title of the header cell
 * @param {bool} sorter - is a boolean indicating whether the header cells should be sorted
 * @returns
 */
function AppTableHead({ title, dataIndex, sorter, isLoading, updateSorter }) {
  const sortTypes = [
    { type: '', icon: cilSwapVertical },
    { type: 'asc', icon: cilArrowBottom },
    { type: 'desc', icon: cilArrowTop },
  ];

  const [indexSort, setIndexSort] = useState(0);

  const onClickSort = () => {
    if (!isLoading) {
      const newIndexSort = (indexSort + 1) % sortTypes.length;
      setIndexSort(newIndexSort);
      updateSorter({ name: dataIndex, type: sortTypes[newIndexSort].type });
    }
  };

  return (
    <div className="d-flex align-items-center">
      {sorter && (
        <CIcon
          style={{ marginRight: '0.5rem' }}
          icon={sortTypes[indexSort].icon}
          onClick={() => onClickSort()}
        />
      )}
      <div>{title}</div>
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
export default function AppTable({ dataSource, columns, isLoading, onSort }) {
  const [sorter, setSorter] = useState();

  useEffect(() => {
    if (sorter) {
      onSort(sorter.name, sorter.type);
    }
  }, [sorter]);

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
                  dataIndex={col.dataIndex}
                  updateSorter={setSorter}
                />
              </CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {isLoading ? (
            <TableSkeleton columns={columns} />
          ) : (
            dataSource.map((data) => <AppRow key={`row_${data.id}`} data={data} />)
          )}
        </CTableBody>
      </CTable>
    </div>
  );
}
