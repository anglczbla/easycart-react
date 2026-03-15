import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AuthPayload {
  token: string;
  data: {
    id: string;
  };
}

const initialState = {
  token: "",
  idUser: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<AuthPayload>) => {
      state.token = action.payload.token;
      state.idUser = action.payload.data.id;
    },
    removeToken: (state) => {
      state.token = "";
      state.idUser = "";
    },
  },
});

export const { addToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
