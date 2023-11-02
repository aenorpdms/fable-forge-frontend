import { createSlice } from "@reduxjs/toolkit";

// Valeur par défaut
const initialState = {
  value: {
    username: null,
    firstname: null,
    email: null,
    token: null,
    fontSizeSet: 16,
    mode: "ligth"
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Mise à jour des informations de l'utilisateur
    updateUser: (state, action) => {
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
    },
    // Déconnecter l'utilisateur
    logOutuser: (state, action) => {
      state.value.username = null;
      state.value.firstname = null;
      state.value.email = null;
      state.value.token = null;
    },
    // Mise à jour de la taille de la police
    updateFontSize: (state, action) => {
      state.value.fontSizeSet = action.payload;
    },
    // Changer le mode d'affichage (light/dark)
    updateMode: (state, action) => {
      state.value.mode = action.payload;
    },
  },
});

export const { updateUser, addStories, removeStories, logOutuser, updateFontSize, updateMode } = userSlice.actions;
export default userSlice.reducer;
