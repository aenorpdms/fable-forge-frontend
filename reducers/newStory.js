import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { length: "", type: "", endingType: "", selectedImage: "", selectedMusic: "", title: "", story: "" },
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
    updateSelectedMusic: (state, action) => {
      state.value.selectedMusic = action.payload;
    },
    addTitle: (state, action) => {
      state.value.title = action.payload;
    },
    saveStory: (state, action) => {
      state.value.story += action.payload
    },
    emptyNewStory: (state, action) => {
      console.log("Inside emptyNewStory reducer");
      state.value.length = ""
      state.value.title = ""
      state.value.endingType = ""
      state.value.selectedImage = ""
      state.value.type = ""
      state.value.story = ""
    }
  },
});

export const { updateNewType, updateNewLength, updateNewEnding, updateSelectedImage, updateSelectedMusic, addTitle, saveStory, emptyNewStory } = newStorySlice.actions;
export default newStorySlice.reducer;
