import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, createStore } from "redux";
import persistStore from "redux-persist/es/persistStore";
import user from "./userReducer";
import tweets from "./tweetsReducer";

const persistConfig = {
  key: "1234",
  storage,
};
const rootReducer = combineReducers({ user, tweets });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
