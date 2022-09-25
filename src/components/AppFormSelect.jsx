import { CFormSelect } from '@coreui/react';
import React from 'react';

/**
 * AppFormSelect is component select form
 *
 * @param {number} pageSelect is the value of select form
 * @param {function} setPageSelect is change select
 * @param {number[]} options is options of select form
 * @returns form select component
 */
export default function AppFormSelect({ pageSelect, setPageSelect, options }) {
  return (
    <div className="AppFormSelect">
      <span>limit:</span>
      <CFormSelect
        defaultValue={pageSelect}
        onChange={(e) => setPageSelect(e.target.value)}
        style={{ border: 'none', width: 'max-content !important' }}
      >
        {options.map((item) => (
          <option key={item} value={item} type="number">
            {item}
          </option>
        ))}
      </CFormSelect>
    </div>
  );
}
