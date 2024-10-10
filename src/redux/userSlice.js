import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    account: {
      jwt: "",
      refresh_token: "",
      name: "",
      role: "",
      email: "",
    },
    isAuthenticated: false,
  },
  reducers: {
    doLogin(state, action) {
      const { jwt, refresh_token, name, role, email } = action.payload;
      state.account = { jwt, refresh_token, name, role, email };
      state.isAuthenticated = true;
    },
    doLogout(state) {
      state.account = {
        jwt: "",
        refresh_token: "",
        name: "",
        role: "",
        email: "",
      };
      state.isAuthenticated = false;
    },
  },
});

export const { doLogin, doLogout } = userSlice.actions;
export default userSlice.reducer;
