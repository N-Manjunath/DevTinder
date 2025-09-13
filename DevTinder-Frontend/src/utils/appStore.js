import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import ConnectionReducer from "./ConnectionSlice";
import RequestsReducer from "./RequestsSlice";
const appStore = configureStore({
  reducer: {
    user:userReducer,
    feed:feedReducer,
    connections:ConnectionReducer,
    requests:RequestsReducer,
  },
})
export default appStore;