import { createSlice } from "@reduxjs/toolkit";

// Valeur par défaut
const initialState = {
  value: { 
    type: "", 
    selectedImage: "", 
    title: "", 
    story: "" 
  },
};

export const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    // Mise à jour de l'état avec les nouvelles valeurs fournies
    updateStory: (state, action) => {
      // Déconstruction de 'payload' depuis 'action' pour extraire les champs nécessaires.
      const { type, selectedImage, title, story } = action.payload;

      // Mise à jour de l'état avec les nouvelles valeurs.
      state.value.type = type;
      state.value.selectedImage = selectedImage;
      state.value.title = title;
      state.value.story = story;
    },
    // Réinitialise l'état aux valeurs par défaut
    emptyStory: (state, action) => {
      state.value.title = "";
      state.value.selectedImage = "";
      state.value.type = "";
      state.value.story = "";
    },
  },
});

export const { updateStory, emptyStory } = storiesSlice.actions;
export default storiesSlice.reducer;
