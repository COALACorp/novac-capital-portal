import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { ValidatedFormValuesType } from "@/components/Quotation/DataForm/DataForm";
import { PlanType } from "@/components/Quotation/Plans/PlansCollection";

type QuotationValue = {
    formValues: ValidatedFormValuesType,
    selectedPlan: PlanType,
};

type QuotationState = {
    value: QuotationValue|null,
};

const initialState: QuotationState = {
    value: null,
};

const quotationSlice = createSlice({
    name: "quotation",
    initialState,
    reducers: {
        setQuotation: (state, action: PayloadAction<QuotationValue>) => {
            state.value = action.payload;
        },
    },
});

export default quotationSlice.reducer;
export type { QuotationValue };
export const { setQuotation } = quotationSlice.actions;
export const selectQuotation = (state: RootState) => state.quotation.value;