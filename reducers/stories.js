import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    stories: []
    
  },
};

export const userSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    addStories: (state, action) => {
        state.value.stories.push(action.payload);
      },
    removeStories: (state, action) => {
        state.value.stories = state.value.stories.filter(
          (e) => e.title !== action.payload
        );
      },
    
  },
});

export const { addStories, removeStories } = storiesSlice.actions;
export default storiesSlice.reducer;

