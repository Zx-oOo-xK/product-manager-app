import React, { useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CModal,
  CRow,
  CSpinner,
} from '@coreui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from './productSlice';
import './style.scss';

export default function ProductFormView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedProduct, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, []);

  const convertValue = (key, data) => {
    if (key === 'created_at' || key === 'updated_at') {
      return new Date(data).toLocaleString('vi-VN', { timeZone: 'UTC' });
    }

    if (typeof selectedProduct[key] === 'boolean') {
      return JSON.stringify(selectedProduct[key]);
    }

    return data;
  };

  return (
    <div>
      {loading ? (
        <CSpinner />
      ) : (
        selectedProduct && (
          <CModal visible>
            <CCard>
              <CCardHeader>
                Product <b>[{selectedProduct.title}]</b> Detail:
              </CCardHeader>
              <CCardBody className="p-4">
                {Object.keys(selectedProduct).map((key) => (
                  <div key={key}>
                    <CRow>
                      <CCol
                        className="col-3"
                        style={{
                          paddingRight: '.5rem',
                          textAlign: 'right',
                          fontWeight: '700',
                          textTransform: 'capitalize',
                        }}
                      >
                        {key}
                      </CCol>
                      <CCol>
                        <span>{convertValue(key, selectedProduct[key])}</span>
                      </CCol>
                    </CRow>
                  </div>
                ))}
              </CCardBody>
              <CCardFooter style={{ textAlign: 'right' }}>
                <CButton className="text-light" onClick={() => navigate(-1)}>
                  close
                </CButton>
              </CCardFooter>
            </CCard>
          </CModal>
        )
      )}
    </div>
  );
}
