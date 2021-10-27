import { createSlice } from '@reduxjs/toolkit';

export const autoSaveSlice = createSlice({
  name: 'autoSave',
  initialState: {
      isAutoSave: true
  },
  reducers: {
    switchAutoSave: (state) => {
        state.isAutoSave = !state.isAutoSave;
    }
  },
})


export const {switchAutoSave} = autoSaveSlice.actions;

export default autoSaveSlice.reducer;