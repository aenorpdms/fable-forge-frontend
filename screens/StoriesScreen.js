import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Modal, TextInput, SafeAreaView, Image, ScrollView } from "react-native";
import TabBar from "../TabBar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateStory } from "../reducers/stories";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";


export default function StoriesScreen({ navigation }) {
  const selectedStory = useSelector((state) => state.stories.value);
  const user = useSelector((state)=> state.user.value)
  const [stories, setStories] = useState([])
  const dispatch = useDispatch()

// DELETE ACCOUNT
  const handleDeleteStory = ({ storyID }) => {
    fetch(`https://fable-forge-backend-84ce.vercel.app/user/${storyID}/${user.token}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log('story delete');
        }
      });
  };



  

const handleDisplayStory = (story) => {
  let typeImage

  if(story.type === "Horreur"){
    typeImage = require("../assets/Horreur.png")
  }else if (story.type === "Aventure"){
    typeImage = require("../assets/Aventure.png")
  }else if (story.type === "Fantasy / SF"){
    typeImage = require("../assets/Fantasy_SF.png")
  }else if (story.type === "Policier / Thriller"){
    typeImage = require("../assets/Policier_Thriller.png")
  }else if (story.type === "Romance"){
    typeImage = require("../assets/Romance.png")
  }else if (story.type === "Enfant"){
    typeImage = require("../assets/Enfant.png")
  }

  const selectedStoryData = {
    title: story.title || "Default Title",
    type: story.type || "Default Type",
    story: story.choicePrompt[0] || "Default Story",
    selectedImage: typeImage,
  };

  dispatch(updateStory(selectedStoryData))
  navigation.navigate("StoryRead");
  };


useEffect(() => {
  fetch(`https://fable-forge-backend-84ce.vercel.app/users/stories/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
        
        setStories([...data.stories])
        
        } else {
         console.log("error")
        }
  });

}, []);


// map sur le tableau et return 
const storiesList = stories.map((story, index) => {
  let typeImage
  if(story.type === "Horreur"){
    typeImage = require("../assets/Horreur.png")
  }else if (story.type === "Aventure"){
    typeImage = require("../assets/Aventure.png")
  }else if (story.type === "Fantasy / SF"){
    typeImage = require("../assets/Fantasy_SF.png")
  }else if (story.type === "Policier / Thriller"){
    typeImage = require("../assets/Policier_Thriller.png")
  }else if (story.type === "Romance"){
    typeImage = require("../assets/Romance.png")
  }else if (story.type === "Enfant"){
    typeImage = require("../assets/Enfant.png")
  }

return (
  <View style={styles.storyButton} key={index}>
    <ImageBackground
      style={styles.storyImage}
      source={typeImage}
    >
      <Text style={styles.storyTitle}>{story.title}</Text>
      <Text style={styles.storyStatus}>Terminée</Text>
    </ImageBackground>
    <TouchableOpacity style={styles.readButton} onPress={()=> handleDisplayStory(story)}>
      <Text style={styles.readButtonText}>Relire</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.deleteBtn} onPress={()=> handleDeleteStory(story._id)}>
      <FontAwesomeIcon icon={faTimesCircle} style={{color: "#ffffff",}}  size={25}/>
    </TouchableOpacity>
  </View>
)})

//dans le scrollview le tableau résultant du map

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <ImageBackground
          style={styles.imagBgd}
          source={require('../assets/ImageBibliotheque.png')}
        >
          <Text style={styles.title1}>Bibliothèque</Text>
        </ImageBackground>
      </View>
      <View style={styles.tabBar}>
        <TabBar navigation={navigation} />
        <View style={styles.backgroundTab}></View>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView  contentContainerStyle={styles.scrollView} indicatorStyle="white">
          {storiesList}
          <View style={styles.space}>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView> 
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#2C1A51",
  },

  header: {
    height: '25%', 
    width: '100%', 
  },

  imagBgd: {
    flex: 1,
    width: "100%",
    height: "104%",
    marginTop:"-12%"
   
  },

  title1: {
    fontFamily: "Lato_400Regular",
    fontSize: 32,
    color: "#FFCE4A",
    marginTop: "49.5%",
    marginLeft: "4%",
  },

  scrollView: {
    width: '100%',
  },

  scrollViewContainer: {
    flex: 1,
    width: "90%",
   
  },

  storiesContainer: {
    alignItems: 'center',
  },

  storyButton: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: "6%",
},

  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow:"hidden",
    justifyContent: 'center',
    alignItems: 'center',
},

  storyTitle: {
    fontFamily: "Lato_400Regular",
    color: 'white',
    fontSize: 24,
},

  storyStatus: {
    fontFamily: "Lato_400Regular",
    color: 'white',
    fontSize: 18,
  },

  readButton: {
    width: "50%",
    backgroundColor: '#2C1A51',
    borderWidth: 1,
    borderColor: '#FFCE4A',
    padding: 10,
    borderRadius: 10,
    marginTop: "-6%", 
   },

  readButtonText: {
    fontFamily: "Lato_400Regular",
    color: 'white',
    fontSize: 16,
    textAlign:"center"
  },
  deleteBtn: {
    bottom: '107%',
    left: '44%',
    backgroundColor: '#2C1A51',
    borderRadius: '100%',
  },
  tabBar: {
    marginTop: "104%",
    position: "absolute",
    zIndex: 1,
  },
  backgroundTab:{
    backgroundColor:"#2C1A51",
    top: "95%", 
    position: "absolute",
    zIndex: -1,
    height: "120%",
    width: 650,
    marginLeft:-400,
    marginTop:-40,
   
  },
  space: {
    padding: 10,
    height: 80,
    backgroundColor:"transparent",
  }
});

