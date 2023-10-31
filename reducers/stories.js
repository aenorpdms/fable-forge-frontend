import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { type: null, selectedImage: null, title: null, story: null },
};

export const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    updateStory: (state, action) => {
      console.log(state.value.type);
      state.value.title = action.payload.title;
      state.value.selectedImage = action.payload.selectedImage;
      state.value.type = action.payload.type;
      state.value.story = action.payload.story;
    },
    emptyStory: (state, action) => {
      console.log("Inside emptyStory reducer");
      state.value.title = null;
      state.value.selectedImage = null;
      state.value.type = null;
      state.value.story = null;
    },
  },
});

export const { updateStory, emptyStory } = storiesSlice.actions;
export default storiesSlice.reducer;
