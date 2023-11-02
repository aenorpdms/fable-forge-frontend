import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subscriptions: [
    {
      id: 1,
      type: "Abonnement hebdomadaire :",
      price: "4.99€/semaine",
      buttonText: "Choisir",
      buttonColor: "#2C1A51",
      textColor: "white",
      imageSource: require("../assets/Abonnement_semaine.png"),
    },
    {
      id: 2,
      type: "Abonnement mensuel :",
      price: "9.99€/mois",
      buttonText: "Choisir",
      buttonColor: "#2C1A51",
      textColor: "white",
      imageSource: require("../assets/Abonnement_mois.png"),
    },
    {
      id: 3,
      type: "Abonnement annuel :",
      price: "99.99€/an",
      buttonText: "Choisir",
      buttonColor: "#2C1A51",
      textColor: "white",
      imageSource: require("../assets/Abonnement_annee.png"),
    },
  ],
  activeSubscription: null, // Abonnement actif sélectionné par l'utilisateur
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    selectSubscription: (state, action) => {
      // Sélection d'un abonnement
      const { id } = action.payload; // Récupération de l'id de l'abonnement à sélectionner depuis l'action
      
      // Mise à jour de la liste des abonnements pour refléter le choix de l'utilisateur
      state.subscriptions = state.subscriptions.map((subscription) => ({
        ...subscription, // Conserver les propriétés existantes de l'abonnement

        // Mise à jour du bouton en fonction de l'abonnement sélectionné
        buttonText: subscription.id === id ? "En cours" : "Choisir",
        buttonColor: subscription.id === id ? "#FFCE4A" : "#2C1A51",
        textColor: subscription.id === id ? "black" : "white",
      }));
      state.activeSubscription = id; // Mise à jour de l'abonnement actif avec l'id sélectionné
    },
  },
});

export const { selectSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
