import { createSlice } from '@reduxjs/toolkit';

export const keyCommandSlice = createSlice({
  name: 'keyCommand',
  initialState: {
      keyCommand: "",
  },
  reducers: {
    add: (state, action) => {
        state.keyCommand += action.payload;
    },
    clear: (state) => {
        state.keyCommand = "";
    }
  },
})


export const {add, clear} = keyCommandSlice.actions;

export default keyCommandSlice.reducer;