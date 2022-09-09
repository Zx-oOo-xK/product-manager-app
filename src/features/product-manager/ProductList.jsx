import React, { useState } from 'react';
import {
  CButton,
  CButtonGroup,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  // CPagination,
  // CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import AppPagination from 'components/AppPagination';

function RowTable({ value, index }) {
  const bg = index % 2 === 0 ? '#eeee' : '#ffff';
  const colorText = index % 2 === 0 ? '#000' : '#000';

  return (
    <CTableRow style={{ margin: 'auto', color: colorText, backgroundColor: bg }}>
      <CTableHeaderCell scope="row">
        <CFormCheck />
      </CTableHeaderCell>
      <CTableDataCell>{value.class}</CTableDataCell>
      <CTableDataCell>{value.name}</CTableDataCell>
      <CTableDataCell>{value.heading}</CTableDataCell>
      <CTableDataCell>
        <CButtonGroup role="group">
          <CButton color="primary">
            <FontAwesomeIcon icon={solid('pen-to-square')} />
          </CButton>
          <CButton color="danger" style={{ color: 'white' }}>
            <FontAwesomeIcon icon={solid('trash-can')} />
          </CButton>
        </CButtonGroup>
      </CTableDataCell>
    </CTableRow>
  );
}

export default function ProductList() {
  const numberRow = [3, 5, 10, 15];
  const [pageSelect, setPageSelect] = useState(numberRow[0]);
  const [sliceItem, setSliceItem] = useState([]);

  const data = [
    {
      class: 'class1',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class2',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class3',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class4',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class5',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class6',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class7',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class8',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class9',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class10',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class11',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class12',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class13',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class14',
      name: 'name1',
      heading: 'heading1',
    },
    {
      class: 'class15',
      name: 'name1',
      heading: 'heading1',
    },
  ];

  return (
    <div>
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

      <CTable>
        <CTableHead style={{ backgroundColor: 'pink' }}>
          <CTableRow>
            <CTableHeaderCell scope="col">
              <CFormCheck />
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              <div className="d-flex justify-content-between align-items-center">
                <div>class</div>
                <FontAwesomeIcon icon={solid('sort')} />
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              <div className="d-flex justify-content-between align-items-center">
                <div>name</div>
                <FontAwesomeIcon icon={solid('sort')} />
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">
              <div className="d-flex justify-content-between align-items-center">
                <div>heading</div>
                <FontAwesomeIcon icon={solid('sort')} />
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell scope="row" />
            <CTableDataCell>
              <CRow className="mb-3">
                <CCol>
                  <CFormInput type="text" />
                </CCol>
              </CRow>
            </CTableDataCell>
            <CTableDataCell>
              <CRow className="mb-3">
                <CCol>
                  <CFormInput type="text" />
                </CCol>
              </CRow>
            </CTableDataCell>
            <CTableDataCell>
              <CRow className="mb-3">
                <CCol>
                  <CFormInput type="text" />
                </CCol>
              </CRow>
            </CTableDataCell>
            <CTableDataCell />
          </CTableRow>

          {sliceItem.map((item, index) => (
            <RowTable key={item.class} value={item} index={index} />
          ))}
        </CTableBody>
      </CTable>

      <div className="d-flex justify-content-between">
        {/* <CPagination>
          <CPaginationItem>
            <FontAwesomeIcon icon={solid('angles-left')} />
          </CPaginationItem>
          <CPaginationItem>
            <FontAwesomeIcon icon={solid('angle-left')} />
          </CPaginationItem>
          <CPaginationItem>1</CPaginationItem>
          <CPaginationItem>2</CPaginationItem>
          <CPaginationItem>3</CPaginationItem>
          <CPaginationItem>
            <FontAwesomeIcon icon={solid('angle-right')} />
          </CPaginationItem>
          <CPaginationItem>
            <FontAwesomeIcon icon={solid('angles-right')} />
          </CPaginationItem>
        </CPagination> */}

        <AppPagination
          itemsPerPage={pageSelect}
          data={data}
          pageRangeDisplayed={3}
          sliceItem={setSliceItem}
          nextLabel={<FontAwesomeIcon icon={solid('angle-right')} />}
          previousLabel={<FontAwesomeIcon icon={solid('angle-left')} />}
        />

        <div>
          <CFormSelect size="sm" className="mb-3" onChange={(e) => setPageSelect(e.target.value)}>
            {numberRow.map((item) => (
              <option key={item} value={item} type="number">
                {item}
              </option>
            ))}
          </CFormSelect>
        </div>
      </div>
    </div>
  );
}
