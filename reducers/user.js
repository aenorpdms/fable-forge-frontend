import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
      username: null,
      firstname: null,
      email: null,
      token: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value = action.payload;
    },
    
  },
});

export const { updateUser, addStories, removeStories } = userSlice.actions;
export default userSlice.reducer;
