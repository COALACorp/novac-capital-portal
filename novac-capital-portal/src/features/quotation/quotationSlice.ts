import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { ValidatedFormValuesType } from "@/components/Quotation/DataForm/DataForm";
import { PlanType } from "@/components/Quotation/Plans/Plans";

type QuotationValue = {
    formValues?: ValidatedFormValuesType,
    selectedPlan?: PlanType,
    applicationId?: number,
};

type QuotationState = {
    value: QuotationValue,
};

const initialState: QuotationState = {
    value: {},
};

const quotationSlice = createSlice({
    name: "quotation",
    initialState,
    reducers: {
        setQuotation: (state, action: PayloadAction<QuotationValue>) => {
            state.value = action.payload;
        },
        setFormValues: (state, action: PayloadAction<ValidatedFormValuesType>) => {
            state.value.formValues = action.payload;
        },
        setSelectedPlan: (state, action: PayloadAction<PlanType>) => {
            state.value.selectedPlan = action.payload;
        },
        setApplicationId: (state, action: PayloadAction<number>) => {
            state.value.applicationId = action.payload;
        }
    },
});

export default quotationSlice.reducer;
export type { QuotationValue };
export const { setQuotation, setFormValues, setSelectedPlan, setApplicationId } = quotationSlice.actions;
export const selectQuotation = (state: RootState) => state.quotation.value;