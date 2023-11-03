import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addSubscription: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addSubscription } = userSlice.actions;
export default userSlice.reducer;
