import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { User } from "firebase/auth";

interface UserValue extends User {
    admin: boolean,
}

type UserState = {
    value: UserValue|null,
};

const initialState: UserState = {
    value: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserValue>) => {
            state.value = action.payload;
        },
        resetUser: (state) => {
            state.value = null;
        },
    },
});

export default userSlice.reducer;
export type { UserValue };
export const { setUser, resetUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.value;
