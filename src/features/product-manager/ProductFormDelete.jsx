import React, { useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CModal } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { deleteProduct } from './productSlice';

export default function ProductFormDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { updateSuccess } = useSelector((state) => state.product);

  useEffect(() => {
    if (updateSuccess) {
      navigate(-1);
    }
  }, [updateSuccess]);

  const onDelete = () => {
    dispatch(deleteProduct(id));
  };

  return (
    <CModal visible>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CCard>
          <CCardHeader>Delete [{id}]</CCardHeader>
          <CCardBody>Are your sure delete product?</CCardBody>
          <CCardFooter>
            <div className="d-flex align-items-center justify-content-end">
              <CButton className="m-3 btn btn-secondary" onClick={() => navigate(-1)}>
                cancel
              </CButton>
              <CButton color="danger" onClick={() => onDelete()}>
                delete
              </CButton>
            </div>
          </CCardFooter>
        </CCard>
      </motion.div>
    </CModal>
  );
}
