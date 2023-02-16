import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middleware = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, middleware);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {contacts: ContactsState, apps: AppsState, etc}
export type AppDispatch = typeof store.dispatch;

export default store;
