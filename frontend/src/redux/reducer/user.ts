import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState } from "../../interface/user";
const initialState: IUserState = {
  user: undefined,
};
export const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<IUser | undefined>) => {
      state.user = payload;
    },
  },
});

export const { setUserData } = userSlicer.actions;

export default userSlicer.reducer;
