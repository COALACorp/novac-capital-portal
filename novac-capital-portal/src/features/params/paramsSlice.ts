import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type ClientParams = {
    administrativeExpense: number,
    creditBureau: number,
    folioVerification: number,
    initialCustomerExpenses: number,
    iva: number,
    planMargins: {
      [key: string]: number,
    },
    openingCommission: number,
    plans: number[],
    signaturesRatification: number,
};

type ParamsState = {
    value: ClientParams|null,
};

const initialState: ParamsState = {
    value: null,
};

export const paramsSlice = createSlice({
    name: "params",
    initialState,
    reducers: {
        setParams: (state, action: PayloadAction<ClientParams>) => {
            state.value = action.payload;
        },
    },
});

export default paramsSlice.reducer;
export type { ClientParams };
export const { setParams } = paramsSlice.actions;
export const selectParams = (state: RootState) => state.params.value;