import React, { useEffect, useState } from 'react';
import {
  CButton,
  CButtonGroup,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CProgress,
  CProgressBar,
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
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from './productSlice';
import PginationComponent from './PginationComponent';

function Badge({ status }) {
  const content = status ? 'active' : 'disabled';
  const style = status ? 'badge bg-success' : 'badge bg-secondary';
  return <span className={style}>{content}</span>;
}

function RowTableProduct({ data }) {
  const dispatch = useDispatch();
  return (
    <CTableRow className="align-middle table-primary">
      <CTableHeaderCell scope="row">
        <CFormCheck />
      </CTableHeaderCell>
      <CTableDataCell>{data.title}</CTableDataCell>
      <CTableDataCell>{data.price}</CTableDataCell>
      <CTableDataCell>{data.quantity}</CTableDataCell>
      <CTableDataCell>
        <Badge status={data.isActive} />
      </CTableDataCell>
      <CTableDataCell>
        <CButtonGroup role="group">
          <CButton color="primary">
            <Link to={`/products/${data.id}`} style={{ color: 'white' }}>
              <FontAwesomeIcon icon={solid('pen-to-square')} />
            </Link>
          </CButton>
          <CButton
            onClick={() => {
              dispatch(deleteProduct(data.id));
            }}
            color="danger"
            style={{ color: 'white' }}
          >
            <FontAwesomeIcon icon={solid('trash-can')} />
          </CButton>
        </CButtonGroup>
      </CTableDataCell>
    </CTableRow>
  );
}

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

function Table({ headerTable, data }) {
  return (
    <CTable className="table table-hover table-striped add-this-class">
      <CTableHead style={{ backgroundColor: 'pink' }}>
        <CTableRow>
          <CTableHeaderCell scope="col">
            <CFormCheck />
          </CTableHeaderCell>
          {headerTable.map((item) => (
            <CTableHeaderCell scope="col" key={item}>
              <div className="d-flex justify-content-between align-items-center">
                <div>{item}</div>
                <FontAwesomeIcon icon={solid('sort')} />
              </div>
            </CTableHeaderCell>
          ))}
          <CTableHeaderCell scope="col" />
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((item, index) => (
          <RowTableProduct key={item.id} data={item} index={index} />
        ))}
      </CTableBody>
    </CTable>
  );
}

function ProcessLoading() {
  return (
    <CProgress className="mb-3">
      <CProgressBar color="danger" variant="striped" animated value={100} />
    </CProgress>
  );
}

function FormSelect({ setPageSelect, numberRow }) {
  return (
    <CFormSelect onChange={(e) => setPageSelect(e.target.value)}>
      {numberRow.map((item) => (
        <option key={item} value={item} type="number">
          {item}
        </option>
      ))}
    </CFormSelect>
  );
}

function FormInput({ control, name }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <CFormInput
          onBlur={onBlur} // notify when input is touched
          onChange={onChange} // send value to hook form
          checked={value}
          inputRef={ref}
        />
      )}
    />
  );
}

// eslint-disable-next-line no-unused-vars
function FormProduct({ id, visible, setVisible }) {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <CForm onSubmit={() => handleSubmit(onSubmit)}>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>{id}</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CRow className="mb-3">
            <CFormLabel className="col-sm-2 col-form-label">title</CFormLabel>
            <CCol sm={10}>
              <FormInput name="title" control={control} />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </CForm>
  );
}

export default function ProductList() {
  const numberRow = [3, 5, 10];
  const headerTable = ['title', 'price', 'quantity', 'status'];

  const [activePage, setActivePage] = useState(1);
  const [pageSelect, setPageSelect] = useState(numberRow[0]);

  const dispatch = useDispatch();
  const { products, loading, dispatchProduct, pagination } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts({ page: 2, limit: 3 }));
  }, [dispatchProduct]);

  useEffect(() => {
    dispatch(getProducts({ limit: pageSelect, page: activePage }));
  }, [pageSelect]);

  useEffect(() => {
    dispatch(getProducts({ limit: pageSelect, page: activePage }));
  }, [activePage]);

  return (
    <div>
      <FilterBar />

      {loading ? (
        <ProcessLoading />
      ) : (
        <>
          <Table headerTable={headerTable} data={products} />

          <div className="d-flex justify-content-between">
            <PginationComponent
              activePage={activePage}
              setActivePage={setActivePage}
              pages={pagination.totalCount / pageSelect}
              display={5}
            />

            <div className="d-flex align-items-center">
              <div style={{ marginRight: 10 }}>limit:</div>
              <div>
                <FormSelect setPageSelect={setPageSelect} numberRow={numberRow} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
