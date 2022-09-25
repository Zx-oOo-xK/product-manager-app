import { toast } from 'react-toastify';

export default () => (next) => (action) => {
  if (action.type.endsWith('fulfilled')) {
    toast.success(`${action.type} Successfully`, { autoClose: 2000 });
  }
  if (action.type.endsWith('rejected')) {
    toast.error(`${action.type} ${action.error.message || 'error'}`, { autoClose: 2000 });
  }
  next(action);
};
