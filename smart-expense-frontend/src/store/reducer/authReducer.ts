import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken")
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },

    logout: (state) => {
      state.accessToken = null;
      localStorage.removeItem("accessToken");
    }
  }
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
