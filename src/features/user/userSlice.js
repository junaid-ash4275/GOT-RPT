// features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    isUserLoggedIn: false,
  },
  reducers: {
    setUserInfo: (state = initialState, action) => {
      state.userInfo = action.payload;
      state.isUserLoggedIn = true;
    },
    clearUserInfo: (state = initialState) => {
      state.userInfo = null;
      state.isUserLoggedIn = false;
    },
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
