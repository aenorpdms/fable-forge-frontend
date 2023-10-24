import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Switch } from "react-native";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerInformation} indicatorStyle='white'></ScrollView>
    </SafeAreaView>
  );
}
