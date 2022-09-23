export default (toast) => () => (next) => (action) => {
  if (action.type.endsWith('fulfilled')) {
    toast({
      title: action.type,
      description: 'Success',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  }
  next(action);
};
