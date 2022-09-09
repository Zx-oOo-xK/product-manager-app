import React from 'react';

export default function Items({ data }) {
  return (
    <div>
      {data &&
        data.map((item) => (
          <div key={item}>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </div>
  );
}
