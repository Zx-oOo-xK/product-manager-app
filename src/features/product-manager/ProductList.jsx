import React, { useEffect, useState } from 'react';
import { CCol, CFormInput, CFormLabel, CFormSelect, CRow, CSpinner } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDispatch, useSelector } from 'react-redux';
import AppTable from 'components/AppTable';
import { getProducts } from './productSlice';

const AppPagination = React.lazy(() => import('components/AppPagination'));

function FilterBar() {
  return (
    <div>
      <CRow className="mb-3 d-flex align-items-center">
        <CFormLabel className="col-sm-1 col-form-label">Filter:</CFormLabel>
        <CCol>
          <CFormInput type="text" placeholder="Type sring..." />
        </CCol>
        <CCol>
          <FontAwesomeIcon icon={solid('filter')} />
        </CCol>
      </CRow>
    </div>
  );
}

function AppFormSelect({ setPageSelect, numberRow }) {
  return (
    <CFormSelect onChange={(e) => setPageSelect(e.target.value)}>
      {numberRow.map((item) => (
        <option key={item} value={item} type="number">
          {item}
        </option>
      ))}
    </CFormSelect>
  );
}

const DEFAULT_MAX_DISPLAY_PAGINATION_NODE = 5;

export default function ProductList() {
  const numberRow = [3, 5, 10];
  // const columns = ['title', 'price', 'quantity', 'status'];

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'is_active',
      dataIndex: 'is_active',
      key: 'is_active',
    },
  ];

  const [activePage, setActivePage] = useState(1);
  const [pageSelect, setPageSelect] = useState(numberRow[0]);

  const dispatch = useDispatch();
  const { products, loading, pagination } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts({ limit: pageSelect, page: activePage }));
  }, [activePage]);

  return (
    <div>
      <FilterBar />

      {loading ? (
        <div style={{ position: 'relative', padding: '2rem' }}>
          <CSpinner style={{ position: 'absolute', left: '50%', translate: '-50%' }} />
        </div>
      ) : (
        <>
          <AppTable dataSource={products} columns={columns} />

          <div className="d-flex justify-content-between">
            <AppPagination
              activePage={activePage}
              setActivePage={setActivePage}
              pages={pagination.totalCount / pageSelect}
              maxDisplayNodePagination={DEFAULT_MAX_DISPLAY_PAGINATION_NODE}
            />

            <div className="d-flex align-items-center">
              <div style={{ marginRight: 10 }}>limit:</div>
              <div>
                <AppFormSelect setPageSelect={setPageSelect} numberRow={numberRow} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
