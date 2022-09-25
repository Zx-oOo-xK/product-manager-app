import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'rootReducer';
import loggerMiddleware from 'app/middleware/logger';
import notificationMiddleware from 'app/middleware/notification';

const getStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these field paths in all actions
          ignoredActionPaths: ['payload.config', 'payload.request', 'error', 'meta.arg'],
        },
      }).concat(loggerMiddleware, notificationMiddleware),
  });

export default getStore;
