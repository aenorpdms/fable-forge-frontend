import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    newStories: {}
    
  },
};

export const userSlice = createSlice({
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
