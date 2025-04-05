import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    selected: 'en', 
  },
  reducers: {
    toggleLanguage: (state) => {
      state.selected = state.selected === 'en' ? 'hi' : 'en';
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
