import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
    firstname: null,
    email: null,
    token: null,
    fontSizeSet: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
    },
    logOutuser: (state, action) => {
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
      // state.value = action.payload;
    },
    updateFontSize: (state, action) => {
      state.value.fontSizeSet = action.payload;
    },
  },
});

export const { updateUser, addStories, removeStories, logOutuser, updateFontSize } = userSlice.actions;
export default userSlice.reducer;
