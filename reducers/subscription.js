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
  activeSubscription: null,
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    selectSubscription: (state, action) => {
      const { id } = action.payload;
      state.subscriptions = state.subscriptions.map((subscription) => ({
        ...subscription,
        buttonText: subscription.id === id ? "En cours" : "Choisir",
        buttonColor: subscription.id === id ? "#FFCE4A" : "#2C1A51",
        textColor: subscription.id === id ? "black" : "white",
      }));
      state.activeSubscription = id;
    },
  },
});

export const { selectSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
