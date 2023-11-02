import { createSlice } from "@reduxjs/toolkit";

// Valeur par défaut
const initialState = {
  value: { 
    length: "Courte",
    type: "", 
    endingType: "Fin heureuse",
    selectedImage: "", 
    selectedMusic: "", 
    title: "", 
    story: "" 
  },
};

export const newStorySlice = createSlice({
  name: "newStory",
  initialState,
  reducers: {
    // Met à jour le type de l'histoire
    updateNewType: (state, action) => {
      state.value.type = action.payload;
    },
    // Met à jour la longueur de l'histoire
    updateNewLength: (state, action) => {
      state.value.length = action.payload;
    },
    // Met à jour le type de fin de l'histoire
    updateNewEnding: (state, action) => {
      state.value.endingType = action.payload;
    },
    // Met à jour l'image sélectionnée pour l'histoire
    updateSelectedImage: (state, action) => {
      state.value.selectedImage = action.payload;
    },
    // Met à jour la musique sélectionnée pour l'histoire
    updateSelectedMusic: (state, action) => {
      state.value.selectedMusic = action.payload;
    },
    // Ajoute un titre à l'histoire
    addTitle: (state, action) => {
      state.value.title = action.payload;
    },
    // Sauvegarde le contenu de l'histoire en ajoutant le nouveau texte
    saveStory: (state, action) => {
      state.value.story += action.payload
    },
    // Réinitialise l'état pour commencer une nouvelle histoire
    emptyNewStory: (state) => {
    // Remettre toutes les propriétés de l'histoire à leurs valeurs par défaut
    state.value = { ...initialState.value };
    },
  },
});

export const { updateNewType, updateNewLength, updateNewEnding, updateSelectedImage, updateSelectedMusic, addTitle, saveStory, emptyNewStory } = newStorySlice.actions;
export default newStorySlice.reducer;
