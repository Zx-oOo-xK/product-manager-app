import React, { useState, useEffect } from 'react';
import { CButton, CFormInput } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDispatch, useSelector } from 'react-redux';
import AppTable from 'components/AppTable';
import usePaginate from 'hooks/usePaginate';
import AppPagination from 'components/AppPagination';
import { Link, Outlet } from 'react-router-dom';
import AppFormSelect from 'components/AppFormSelect';
import { deleteProduct, getProducts } from './productSlice';
import './style.scss';

const initColumns = (dispatch) => [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    sorter: true,
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
    sorter: true,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: true,
  },
  {
    title: 'User',
    dataIndex: 'userID',
    key: 'userID',
  },
  {
    title: 'Active',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (data) => (
      <div className="active-table">
        {data.isActive ? (
          <FontAwesomeIcon icon={solid('check')} style={{ color: '#76ff03' }} />
        ) : (
          <FontAwesomeIcon icon={solid('xmark')} style={{ color: '#f50057' }} />
        )}
      </div>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (data) => (
      <div className="action-table">
        <Link to={`${data.id}/update`} className="update-button text-light btn btn-info d-inline">
          <FontAwesomeIcon icon={solid('pen-to-square')} />
        </Link>
        <CButton
          onClick={() => dispatch(deleteProduct(data.id))}
          className="delete-button text-light d-inline btn btn-danger"
        >
          <FontAwesomeIcon icon={solid('trash-can')} />
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
  const { sortInfo } = useSelector((state) => state.status);

  const onChangePage = (currentPage) => {
    const input = { page: currentPage, limit: pageSize, sort: sortInfo };
    dispatch(getProducts(input));
  };

  const [currentPage, goToPage, prev, next, breakPrev, breakNext, jumpPrev, jumpNext] = usePaginate(
    1,
    pageSize,
    pagination.totalCount,
    onChangePage
  );

  useEffect(() => {
    if (updateSuccess !== undefined) {
      const input = { page: currentPage, limit: pageSize, sort: sortInfo };
      dispatch(getProducts(input));
    }
  }, [sortInfo]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getProducts({ page: currentPage, limit: pageSize, sort: sortInfo }));
    }
  }, [updateSuccess]);

  return (
    <div className="smart-table mb-4 container-fluid">
      <div className="header-table">
        <div className="wrapper-fillter d-flex w-100">
          <CFormInput className="fillter" placeholder="fillter" />
          <Link to="new" className="new-product btn text-light">
            <FontAwesomeIcon icon={solid('plus')} />
            <div className="d-none d-sm-block">new product</div>
          </Link>
        </div>
      </div>
      <div>
        <AppTable dataSource={products} columns={columns} isLoading={loading} />

        <div>
          <div className="footer-table">
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
      <Outlet />
    </div>
  );
}
