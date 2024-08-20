import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  forms: [],
};

const tables = createSlice({
  name: "tables",
  initialState,
  reducers: {
    datas: (state, action) => {
      state.forms.push(action.payload);
    },
    cekImport: (state, action) => {
      state.forms.splice(action.payload, 1);
    },
  },
});

export const { datas, cekImport } = tables.actions;

export default tables.reducer;
