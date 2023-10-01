import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState } from "../../interface/user";
const initialState: IUserState = {
  user: undefined,
  diseases: undefined,
  isPending: false,
};
export const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<IUser | undefined>) => {
      state.user = payload;
    },
    setUserDiseases: (state, { payload }: PayloadAction<Array<string>>) => {
      state.diseases = payload;
    },
    resetUserData: (state) => {
      state.user = undefined;
      state.diseases = undefined;
      state.isPending = false;
    },
    setIsUserDataPending: (state, { payload }: PayloadAction<boolean>) => {
      state.isPending = payload;
    },
  },
});

export const { setUserData, setUserDiseases, resetUserData, setIsUserDataPending } =
  userSlicer.actions;

export default userSlicer.reducer;
