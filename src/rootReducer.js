import counterReducer from 'features/counter/counterSlice';
import productReducer from 'features/product-manager/productSlice';

const rootReducer = {
  counter: counterReducer,
  product: productReducer,
};

export default rootReducer;
