import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:  {}
};

export const newStoriesSlice = createSlice({
  name: "newStories",
  initialState,
  reducers: {
    updateUser: (state, action) => {
        state.value.newStories = action.payload;
      },
    
  },
});

export const { updateNew } = newStoriesSlice.actions;
export default newStoriesSlice.reducer;
