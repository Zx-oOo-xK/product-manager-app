import React, { useState, useEffect } from 'react';
import { CBadge, CCol, CFormInput, CFormLabel, CFormSelect, CRow, CSpinner, CButton } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDispatch, useSelector } from 'react-redux';
import AppTable from 'components/AppTable';
import usePaginate from 'hooks/usePaginate';
import AppPagination from 'components/AppPagination';
import { Link } from 'react-router-dom';
import { deleteProduct, getProducts } from './productSlice';

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

const columns = (dispatch) => [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
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
    title: 'User id',
    dataIndex: 'userID',
    key: 'userID',
  },
  {
    title: 'Active',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (data) => (
      <CBadge color={data.isActive ? 'success' : 'danger'}>{data.isActive ? 'Active' : 'UnActive'}</CBadge>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (data) => (
      <div className='d-flex justify-content-center' style={{ gap: '.3rem' }}>
        <Link to={`${data.id}/update`} className='text-light'><CButton className='btn btn-info text-light d-inline'><FontAwesomeIcon icon={solid('pen-to-square')} /></CButton></Link>
        <CButton onClick={() => { dispatch(deleteProduct(data.id)) }} className='btn btn-danger text-light d-inline'><FontAwesomeIcon icon={solid('trash-can')} /></CButton>
      </div>
    )
  }
];

const DEFAULT_MAX_DISPLAY_PAGINATION_NODE = 5;

export default function ProductList() {

  const dispatch = useDispatch();

  const numberRow = [3, 5, 10];

  const [pageSelect, setPageSelect] = useState(numberRow[0]);
  const { products, loading, pagination, updateSuccess } = useSelector((state) => state.product);

  const onChangePage = (currentPage) => {
    dispatch(getProducts({ page: currentPage, limit: pageSelect }));
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

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, limit: pageSelect }));
  }, [updateSuccess])

  return (
    <div>
      <FilterBar />


      <Link to='new' className='btn btn-primary text-light text-decoration-none'><FontAwesomeIcon icon={solid('plus')} /></Link>

      {/* TODO : split */}
      <div style={{ width: 'max-centent' }}>
        {
          loading ?
            <Loading />
            :
            <>
              <AppTable dataSource={products} columns={columns(dispatch)} />

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
      </div>

    </div >
  );
}