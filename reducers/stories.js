import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { type: "", selectedImage: "", title: "", story: "" },
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
      state.value.title = "";
      state.value.selectedImage = "";
      state.value.type = "";
      state.value.story = "";
    },
  },
});

export const { updateStory, emptyStory } = storiesSlice.actions;
export default storiesSlice.reducer;
