import React, { useState, useEffect } from 'react';
import { CBadge, CSpinner, CButton } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDispatch, useSelector } from 'react-redux';
import AppTable from 'components/AppTable';
import usePaginate from 'hooks/usePaginate';
import AppPagination from 'components/AppPagination';
import { Link, Outlet } from 'react-router-dom';
import AppFormSelect from 'components/AppFormSelect';
import { deleteProduct, getProducts } from './productSlice';

function Loading() {
  return (
    <div style={{ position: 'relative', padding: '2rem' }}>
      <CSpinner style={{ position: 'absolute', left: '50%', translate: '-50%' }} />
    </div>
  );
}

const initColumns = (dispatch) => [
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
      <CBadge color={data.isActive ? 'success' : 'danger'}>
        {data.isActive ? 'Active' : 'UnActive'}
      </CBadge>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (data) => (
      <div className="d-flex justify-content-start" style={{ gap: '.3rem' }}>
        <Link
          to={`${data.id}/update`}
          className="text-light btn btn-info text-light d-inline"
          style={{
            backgroundColor: '#1e88e5',
            borderRadius: '.2rem',
          }}
        >
          <FontAwesomeIcon icon={solid('pen-to-square')} style={{ color: '#fff' }} />
        </Link>
        <CButton
          onClick={() => {
            dispatch(deleteProduct(data.id));
          }}
          className="text-light d-inline btn btn-danger"
          style={{
            backgroundColor: '#f50057',
            borderRadius: '.2rem',
          }}
        >
          <FontAwesomeIcon icon={solid('trash-can')} style={{ color: '#fff' }} />
        </CButton>
      </div>
    ),
  },
];

const DEFAULT_MAX_DISPLAY_PAGINATION_NODE = 5;

export default function ProductList() {
  const dispatch = useDispatch();

  const pageSizeOptions = [3, 5, 10];
  const [pageSize, setPageSelect] = useState(pageSizeOptions[0]);

  const columns = initColumns(dispatch);
  const { products, loading, pagination, updateSuccess } = useSelector((state) => state.product);

  const onChangePage = (currentPage) => {
    dispatch(getProducts({ page: currentPage, limit: pageSize }));
  };

  const [currentPage, goToPage, prev, next, breakPrev, breakNext, jumpPrev, jumpNext] = usePaginate(
    1,
    pageSize,
    pagination.totalCount,
    onChangePage
  );

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getProducts({ page: currentPage, limit: pageSize }));
    }
  }, [updateSuccess]);

  return (
    <div>
      <Link to="new" className="btn btn-primary text-light text-decoration-none">
        <FontAwesomeIcon icon={solid('plus')} />
      </Link>

      <div>
        {loading ? (
          <Loading />
        ) : (
          <div style={{ border: '1px solid black' }}>
            <div style={{ margin: 'auto' }}>
              <div style={{ display: 'block' }}>
                <AppTable dataSource={products} columns={columns} />
              </div>

              <div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                  <AppPagination
                    activePage={currentPage}
                    prev={prev}
                    next={next}
                    goToPage={goToPage}
                    breakPrev={breakPrev}
                    breakNext={breakNext}
                    jumpPrev={jumpPrev}
                    jumpNext={jumpNext}
                    pages={Math.ceil(pagination.totalCount / pageSize)}
                    maxDisplayNodePagination={DEFAULT_MAX_DISPLAY_PAGINATION_NODE}
                  />

                  <AppFormSelect
                    pageSelect={pageSize}
                    setPageSelect={setPageSelect}
                    options={pageSizeOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Outlet />
    </div>
  );
}
