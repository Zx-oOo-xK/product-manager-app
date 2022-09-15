import React, { useState } from 'react';
import { CBadge, CCol, CFormInput, CFormLabel, CFormSelect, CRow, CSpinner } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDispatch, useSelector } from 'react-redux';
import AppTable from 'components/AppTable';
import usePaginate from 'hooks/usePaginate';
import AppPagination from 'components/AppPagination';
import { getProducts } from './productSlice';

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

function Loading() {
  return <div style={{ position: 'relative', padding: '2rem' }}>
    <CSpinner style={{ position: 'absolute', left: '50%', translate: '-50%' }} />
  </div>
}

function AppFormSelect({ pageSelect, setPageSelect, options }) {
  return (
    <div className="d-flex align-items-center">
      <div style={{ marginRight: 10 }}>limit:</div>
      <div>
        <CFormSelect defaultValue={pageSelect} onChange={(e) => setPageSelect(e.target.value)}>
          {options.map((item) => (
            <option key={item} value={item} type="number">
              {item}
            </option>
          ))}
        </CFormSelect>
      </div>
    </div>
  );
}

const DEFAULT_MAX_DISPLAY_PAGINATION_NODE = 5;

export default function ProductList() {
  const dispatch = useDispatch();

  const numberRow = [3, 5, 10];
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (val) => (
        <CBadge color={val ? 'success' : 'danger'} shape="rounded-pill">
          {val ? 'Active' : 'Inactive'}
        </CBadge>
      ),
    },
  ];
  const [pageSelect, setPageSelect] = useState(numberRow[0]);
  const { products, loading, pagination } = useSelector((state) => state.product);

  const onChangePage = (currentPage) => {
    dispatch(getProducts({ page: currentPage, limit: pageSelect })); // call api
  };

  const [
    currentPage,
    goToPage,
    prev,
    next,
    breakPrev,
    breakNext,
    jumpPrev,
    jumpNext] = usePaginate(
      1,
      pageSelect,
      pagination.totalCount,
      onChangePage
    );

  return (
    <div>
      <FilterBar />

      {loading ?
        <Loading />
        :
        <>
          <AppTable dataSource={products} columns={columns} />

          <div className="d-flex justify-content-between">
            <AppPagination
              activePage={currentPage}
              prev={prev}
              next={next}
              goToPage={goToPage}
              breakPrev={breakPrev}
              breakNext={breakNext}
              jumpPrev={jumpPrev}
              jumpNext={jumpNext}
              pages={Math.ceil(pagination.totalCount / pageSelect)}
              maxDisplayNodePagination={DEFAULT_MAX_DISPLAY_PAGINATION_NODE}
            />

            <AppFormSelect
              pageSelect={pageSelect}
              setPageSelect={setPageSelect}
              options={numberRow} />
          </div>
        </>
      }
    </div >
  );
}
