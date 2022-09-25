import React, { useState, useEffect } from 'react';
import { CFormInput } from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDispatch, useSelector } from 'react-redux';
import AppTable from 'components/AppTable';
import usePaginate from 'hooks/usePaginate';
import AppPagination from 'components/AppPagination';
import { Link, Outlet } from 'react-router-dom';
import AppFormSelect from 'components/AppFormSelect';
import { getProducts } from './productSlice';
import './style.scss';

const initColumns = () => [
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
        <Link to={`${data.id}/see`} className="eye-button btn">
          <FontAwesomeIcon icon={solid('eye')} />
        </Link>
        <Link to={`${data.id}/update`} className="update-button btn">
          <FontAwesomeIcon icon={solid('pen-to-square')} />
        </Link>
        <Link to={`${data.id}/delete`} className="delete-button btn">
          <FontAwesomeIcon icon={solid('trash-can')} />
        </Link>
      </div>
    ),
  },
];

export default function ProductList() {
  const dispatch = useDispatch();

  const pageSizeOptions = [10, 30, 50];
  const [pageSize, setPageSelect] = useState(pageSizeOptions[0]);

  const columns = initColumns(dispatch);
  const { products, loading, pagination, updateSuccess } = useSelector((state) => state.product);

  const [currentPage, goToPage, prev, next] = usePaginate(1, pageSize, pagination.totalCount);

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, limit: pageSize }));
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(getProducts({ page: currentPage, limit: pageSize }));
    }
  }, [updateSuccess]);

  const onSortTable = (name, type) => {
    const input = { page: currentPage, limit: pageSize, sort: { name, type } };
    dispatch(getProducts(input));
  };

  return (
    <div className="smart-table container-fluid">
      <div className="header-table">
        <div className="wrapper-fillter d-flex w-100">
          <CFormInput className="fillter" placeholder="Fillter here!" />
          <Link to="new" className="new-product btn text-light">
            <FontAwesomeIcon icon={solid('plus')} />
            <div className="d-none d-sm-block">new product</div>
          </Link>
        </div>
      </div>
      <div>
        <AppTable
          dataSource={products}
          columns={columns}
          isLoading={loading}
          onSort={onSortTable}
        />

        <div>
          <div className="footer-table">
            <AppFormSelect
              pageSelect={pageSize}
              setPageSelect={setPageSelect}
              options={pageSizeOptions}
            />

            <AppPagination
              activePage={currentPage}
              prev={prev}
              next={next}
              goToPage={goToPage}
              pages={Math.ceil(pagination.totalCount / pageSize)}
            />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
