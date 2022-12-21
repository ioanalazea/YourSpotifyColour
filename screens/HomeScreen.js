import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, TouchableOpacity,} from "react-native";
import { StyleSheet, View, Text } from "react-native";
import CustomHeader from "../components/CustomHeader";
import Player from "../components/Player";
import MainSwiper from "../components/MainSwiper";

const HomeScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  console.log("index", index);
  const onSwiped = () => {
    if (index === 19) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }

    //console.log("index", index);
  };

  return (
    <SafeAreaView>
      
      <View style={styles.container}>
          <StatusBar style="dark" />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}><Text style={styles.buttonText}>Logout</Text></TouchableOpacity>

          <CustomHeader />
          
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: "2%",
              backgroundColor:"#D5BDAF"
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Top {index + 1} Song</Text>
          </View>

          <MainSwiper index={index} onSwiped={onSwiped} />

      </View>

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({ 
  container: {
  //flex: 1,
  //alignItems: "center",
  //justifyContent: "center",
  //backgroundColor: "#D5BDAF",
  },
  button: {
    width: 100,
    height: 50,
    marginTop: 1,
    borderRadius: 30,
    backgroundColor:"#D5BDAF",
  },

  buttonText:{
    fontSize: 18,
    marginTop: 12,
    color: "#C29F8B",
    fontWeight: "bold",
    alignSelf: "center",
  }


});
