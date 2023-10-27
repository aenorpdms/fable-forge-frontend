import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

export default function paymentScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.containerPayment}>
        <Text style={styles.title1}>Paiement</Text>
        <Text style={styles.title2}>Choisissez votre méthode de paiement</Text>
        <Text style={styles.title3}>Vous serez débité une fois l'abonnement validé</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2C1A51",
  },
});
