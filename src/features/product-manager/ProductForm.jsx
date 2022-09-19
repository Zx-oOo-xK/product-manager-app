import React, { useEffect, useState } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CRow, CSpinner } from '@coreui/react';
import { useForm } from 'react-hook-form';
import ValidatedInput from 'components/ValidatedInput';
import ValidatedCheckbox from 'components/ValidatedCheckbox';
import ValidatedTextarea from 'components/ValidatedTextarea';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getProduct, updateProduct } from './productSlice';

const formRules = {
  title: {
    required: 'Please provide a valid title',
  },
  price: {
    required: 'Please provide a valid price',
    min: 1,
    max: 9999999999,
  },
  quantity: {
    required: 'Please provide a valid quantity',
    min: 1,
    max: 100000,
  },
  user_id: {
    required: 'Please provide a valid user id',
  },
};

export default function ProductForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const { selectedProduct, loading, updateSuccess } = useSelector((state) => state.product);

  useEffect(() => {
    if (submit) navigate(-1);
  }, [updateSuccess]);

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      id: null,
      title: '',
      description: '',
      price: 1,
      quantity: 1,
      is_active: false,
      user_id: 1,
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [id]);

  useEffect(() => {
    if (selectedProduct) {
      Object.keys(selectedProduct).map((name) => setValue(name, selectedProduct[name]));
    }
  }, [selectedProduct]);

  const onSubmit = (data) => {
    if (id) {
      dispatch(updateProduct({ id, data }));
    } else {
      dispatch(createProduct(data));
    }
    setSubmit(true);
  };

  const styleBase = {
    cform: { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' },
    ccardheader: { padding: '0.5rem 1rem', fontWeight: '600', color: '#777' },
  };

  return (
    <div>
      {loading ? (
        <CSpinner />
      ) : (
        <CForm
          onSubmit={handleSubmit(onSubmit)}
          validated
          className="col-sm-6 col-10 position-absolute"
          style={styleBase.cform}
        >
          <CCard>
            <CCardHeader>
              <div style={styleBase.ccardheader}>
                {id ? `Update Product [${id}]` : 'Create Product'}
              </div>
            </CCardHeader>
            <CCardBody className="m-3">
              <ValidatedInput
                control={control}
                name="title"
                type="text"
                label="Title"
                rules={formRules.title}
                required
              />
              <ValidatedTextarea control={control} name="description" label="description" />
              <CRow className="d-flex flex-wrap algin-items-center">
                <CCol>
                  <ValidatedInput
                    control={control}
                    name="price"
                    type="number"
                    label="price"
                    rules={formRules.price}
                    required
                  />
                </CCol>
                <CCol>
                  <ValidatedInput
                    control={control}
                    name="quantity"
                    type="number"
                    label="quantity"
                    rules={formRules.quantity}
                    required
                  />
                </CCol>
              </CRow>
              <div className="pt-4">
                <ValidatedCheckbox control={control} name="is_active" label="active" />
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <CButton className="m-3 btn btn-secondary" onClick={() => navigate(-1)}>
                  cancel
                </CButton>
                <CButton type="submit">submit</CButton>
              </div>
            </CCardBody>
          </CCard>
        </CForm>
      )}
    </div>
  );
}
