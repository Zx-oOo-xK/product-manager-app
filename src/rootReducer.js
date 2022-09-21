import counterReducer from 'features/counter/counterSlice';
import productReducer from 'features/product-manager/productSlice';
import statusReducer from 'app/statusSlice';

const rootReducer = {
  counter: counterReducer,
  product: productReducer,
  status: statusReducer,
};

export default rootReducer;
