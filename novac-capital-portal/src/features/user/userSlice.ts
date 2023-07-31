import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { User } from "firebase/auth";

interface UserValue extends User {
    registered: boolean,
    admin: boolean,
};

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
        setRegistered: (state, action: PayloadAction<boolean>) => {
            if (state.value)
                state.value.registered = action.payload;
        },
        resetUser: (state) => {
            state.value = null;
        },
    },
});

export default userSlice.reducer;
export type { UserValue };
export const { setUser, setRegistered, resetUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.value;
