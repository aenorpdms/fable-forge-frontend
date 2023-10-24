import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { user: {
    username: null,
    name: null,
    email: null, 
  }, stories: [] },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value.user = action.payload;
    },
    addStories: (state, action) => {
      state.value.stories.push(action.payload);  
    },
    removeStories: (state, action) => {
      state.value.stories = state.value.stories.filter(e => e.title !== action.payload);
    },
  },
});

export const { updateUser, addStories, removeStories} = userSlice.actions;
export default userSlice.reducer;
