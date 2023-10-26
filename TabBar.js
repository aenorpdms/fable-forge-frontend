import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export default function TabBar({ navigation }) {
    const [isOpen, setIsOpen] = useState(false);

    const widthValue = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: withTiming(widthValue.value, {
                duration: 400,
                easing: Easing.linear,
            }),
        };
    });
    const bgValue = useSharedValue(0); // 0 pour fermé, 1 pour ouvert

    const animatedBackgroundStyle = useAnimatedStyle(() => {
        const bgColor = bgValue.value === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.5)';
        return {
            backgroundColor: bgColor,
        };
    });

    const toggleTabBar = () => {
        setIsOpen(prevState => {
            if (prevState) {
                widthValue.value = 0; // Réduire la largeur à 0
                bgValue.value = 0;
            } else {
                widthValue.value = 140; // Augmenter la largeur à la valeur souhaitée
                bgValue.value = 1;
            }
            return !prevState;
        });
    };

    const handleDisplayHome = () => {
        navigation.navigate("Home");
    };

    const handleDisplayStory = () => {
        navigation.navigate("StoryDisplay");
    };

    const handleDisplayProfil = () => {
        navigation.navigate("Profil");
    };

    const handleDisplaySettings = () => {
        navigation.navigate("Settings");
    };

    return (
    <View style={styles.pageContainer}>
        <View style={styles.tabBar}>
            <Animated.View style={[styles.background, animatedBackgroundStyle]} />
            <Animated.View style={[styles.tabBarItem, animatedStyles]}>
              <TouchableOpacity style={styles.icone1} onPress={()=> handleDisplayHome()}>
                <Image source={require('./assets/home.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icone2} onPress={()=> handleDisplayStory()}>
                <Image source={require('./assets/book.png')} />
              </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleTabBar}>
                <FontAwesomeIcon icon={faCircle} size={24} color="white" />
            </TouchableOpacity>
            <Animated.View style={[styles.tabBarItem, animatedStyles]}>
              <TouchableOpacity onPress={()=> handleDisplayProfil()}>
                <Image source={require('./assets/user.png')} />  
              </TouchableOpacity> 
              <TouchableOpacity onPress={()=> handleDisplaySettings()}>
                <Image source={require('./assets/roue.png')} />
              </TouchableOpacity>
            </Animated.View>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1, 
        backgroundColor: '#2C1A51',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabBarItem: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-around',
        margin: 15,
        alignItems: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        width: 40, // Cacher initialement les icônes
    },
    toggleButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 40, // Exemple
        height: 40,
        backgroundColor: '#ffffff',
        borderRadius: 30,
        marginHorizontal: 5,
        elevation: 5, // pour l'ombre android
        shadowColor: "#4527A0", // pour l'ombre iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        opacity: 0.4,
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
        bottom: 0,
        borderRadius: 25,
    },
});
