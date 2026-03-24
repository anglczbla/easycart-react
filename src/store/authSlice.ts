import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AuthPayload {
  token: string;
  data: {
    id: string;
    role: string;
  };
}

const responseBe = localStorage.getItem("userData") || "null";
const userData = JSON.parse(responseBe);

const initialState = {
  token: userData?.token || "",
  idUser: userData?.data?.id || "",
  admin: userData?.data?.role === "admin" || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<AuthPayload>) => {
      state.token = action.payload.token;
      state.idUser = action.payload.data.id;
      state.admin = action.payload.data.role === "admin";
    },
    removeToken: (state) => {
      state.token = "";
      state.idUser = "";
      state.admin = false;
    },
  },
});

export const { addToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
