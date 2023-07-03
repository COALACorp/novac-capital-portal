import { configureStore } from "@reduxjs/toolkit";
import paramsReducer from "@/features/params/paramsSlice";
import userReducer from "@/features/user/userSlice";
import quotationReducer from "@/features/quotation/quotationSlice";

const store = configureStore({
    reducer: {
        params: paramsReducer,
        user: userReducer,
        quotation: quotationReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;