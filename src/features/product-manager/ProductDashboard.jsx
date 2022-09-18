import { CBadge } from '@coreui/react';
// eslint-disable-next-line no-unused-vars
import AppTable from 'components/AppTable';
import React from 'react';
import ProductForm from './ProductForm';

export default function ProductDashboard() {
  // eslint-disable-next-line no-unused-vars
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
    {
      title: 'tags',
      dataIndex: 'tags',
      key: 'tags',
      render: ({ tags }) => (
        <div className="d-flex align-items-center" style={{ gap: 4 }}>
          {tags.map((tag) => {
            let color = 'secondary';
            if (tag === 'ok') color = 'primary';
            if (tag === 'done') color = 'success';
            return (
              <CBadge key={JSON.stringify(tag)} color={color}>
                {tag}
              </CBadge>
            );
          })}
        </div>
      ),
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const dataSource = [
    {
      id: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
      tags: ['ok', 'dbrr'],
    },
    {
      id: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
      tags: ['ok', 'done'],
    },
  ];

  return (
    <div>
      {/* <AppTable dataSource={dataSource} columns={columns} /> */}
      <ProductForm />

    </div>
  );
}
