import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const splashTime = 3000; // 3 secondes
  const animationDuration = 500; // Durée de l'animation en millisecondes

  // État local pour l'animation
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Démarrer l'animation pour faire apparaître l'indicateur de chargement
    Animated.timing(animation, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      // Utiliser navigation.replace pour passer à l'écran d'accueil et empêcher le retour en arrière
      navigation.replace('Sign');
    }, splashTime);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/loading.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <ActivityIndicator style={styles.activityIndicator} size="large" color="#D9D9D9" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C1A51',
  },
  text: {
    fontSize: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  activityIndicator: {
    position: 'absolute', 
    top: '67%',
    left: '47%',
  }
});

export default SplashScreen;
