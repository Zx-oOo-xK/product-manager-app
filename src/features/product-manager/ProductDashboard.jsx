import { CProgress, CProgressBar } from '@coreui/react';
import AppTable from 'components/AppTable';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './productSlice';

function ProcessLoading() {
  return (
    <CProgress className="mb-3">
      <CProgressBar color="danger" variant="striped" animated value={100} />
    </CProgress>
  );
}

export default function ProductDashboard() {
  const { loading, dispatchProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const dataSource = [
    {
      id: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      id: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  useEffect(() => {
    dispatch(getProducts({ page: 2, limit: 3 }));
  }, [dispatchProduct]);

  return (
    <div>
      {loading ? <ProcessLoading /> : <AppTable dataSource={dataSource} columns={columns} />}
    </div>
  );
}
