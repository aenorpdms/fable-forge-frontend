import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { length: null, type: null, endingType: null, selectedImage: null },
};

export const newStorySlice = createSlice({
  name: "newStory",
  initialState,
  reducers: {
    updateNewType: (state, action) => {
      state.value.type = action.payload;
    },
    updateNewLength: (state, action) => {
      state.value.length = action.payload;
    },
    updateNewEnding: (state, action) => {
      state.value.endingType = action.payload;
    },
    updateSelectedImage: (state, action) => {
      state.value.selectedImage = action.payload;
    },
  },
});

export const { updateNewType, updateNewLength, updateNewEnding, updateSelectedImage } = newStorySlice.actions;
export default newStorySlice.reducer;
