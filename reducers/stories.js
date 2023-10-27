import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stories: []
};

export const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    addStories: (state, action) => {
        state.stories.push(action.payload);
      },
    removeStories: (state, action) => {
        state.stories = state.stories.filter(
          (e) => e.title !== action.payload
        );
      },
    
  },
});

export const { addStories, removeStories } = storiesSlice.actions;
export default storiesSlice.reducer;

