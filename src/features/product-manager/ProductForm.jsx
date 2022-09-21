import React, { useEffect } from 'react';
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

const styleBase = {
  cForm: { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' },
  cCardHeader: { padding: '0.5rem 1rem', fontWeight: '600', color: '#777' },
};

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedProduct, loading, updateSuccess } = useSelector((state) => state.product);

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
    if (updateSuccess) {
      navigate(-1);
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (id && selectedProduct) {
      Object.keys(selectedProduct).map((name) => setValue(name, selectedProduct[name]));
    }
  }, [selectedProduct]);

  const onSubmit = (data) => {
    if (id) {
      dispatch(updateProduct({ id, data }));
    } else {
      dispatch(createProduct(data));
    }
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
          style={styleBase.cForm}
        >
          <CCard>
            <CCardHeader>
              <div style={styleBase.cCardHeader}>
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
                <CButton disabled={loading} type="submit">
                  submit
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CForm>
      )}
    </div>
  );
}
