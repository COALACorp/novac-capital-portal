import { configureStore } from "@reduxjs/toolkit";
import paramsSlice from "../features/params/paramsSlice";

const store = configureStore({
    reducer: {
        params: paramsSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;