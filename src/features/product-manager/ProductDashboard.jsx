import React, { useState } from 'react';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'components/AppPagination';
import Items from './Items';

const data = [...Array(33).keys()];

export default function ProductDashboard() {
  const [sliceItem, setSliceItem] = useState();

  return (
    <div>
      <Items data={sliceItem} />
      <Pagination
        itemsPerPage={7}
        data={data}
        pageRangeDisplayed={3}
        sliceItem={setSliceItem}
        nextLabel={<FontAwesomeIcon icon={solid('angle-right')} />}
        previousLabel={<FontAwesomeIcon icon={solid('angle-left')} />}
      />
    </div>
  );
}
