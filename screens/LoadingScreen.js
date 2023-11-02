import React, { useEffect } from 'react';
import { 
  View, 
  ActivityIndicator, 
  Image, 
  StyleSheet, 
  Animated 
} from 'react-native';

const LoadingScreen = ({ navigation }) => {

  // Durée de l'affichage de l'écran splash en millisecondes.
  const splashTime = 3000;

  // Durée de l'animation de l'opacité en millisecondes.
  const animationDuration = 500;

  // État local pour l'animation qui commence à 0.
  const animation = new Animated.Value(0);

  useEffect(() => {
    // Démarrage de l'animation d'opacité
    Animated.timing(animation, {
      duration: animationDuration, // Durée de l'animation.
      useNativeDriver: true, // Utilisation du driver natif pour de meilleures performances.
    }).start();

    // Définition d'un timer pour naviguer vers l'écran suivant après `splashTime`.
    const timer = setTimeout(() => {
      navigation.replace('Sign'); // Navigation vers l'écran 'Sign'.
    }, splashTime);

    // Nettoyage du timer si le composant est démonté avant que le timer ne soit terminé.
    return () => clearTimeout(timer);
  }, [navigation]);

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

export default LoadingScreen;
