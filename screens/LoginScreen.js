import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Text } from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import {Dimensions} from 'react-native';
import { useEffect, useState } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useSelector, useDispatch } from "react-redux";
import * as tokenAction from "../store/actions/token";
import axios from "axios";
import * as songAction from "../store/actions/topSongs";

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: "1533c901601f45b9abbe43a9451265c5",
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: "exp://192.168.100.153:19000",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      axios("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term", {      //gets the first 20 top songs from 6 months
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          dispatch(songAction.addTopSongs(response));
        })
        .catch((error) => {
          console.log("error", error.message);
        });

      setTimeout(
        () =>
          navigation.replace("Home", {
            token: token,
            other: "blaaaa",
          }),
        500
      );

      dispatch(tokenAction.addToken(token));
    }
  });

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <LinearGradient
          colors={['#8b6e5e', '#e3d5ca', '#edede9' ]}
          style={styles.linearGradient}
        >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#F5EBE0",
          marginBottom: "20%",
        }}
      >
        your spotify's colour
      </Text>
      <TouchableOpacity onPress={() => {promptAsync();}} style={styles.button}>
        <Text style={styles.buttonText}>Login with Spotify</Text>
      </TouchableOpacity>

      </LinearGradient>
      
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "#D5BDAF",
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:windowHeight,
    width:windowWidth,
   
  },
  button: {
    width: 200,
    height: 50,
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 30,
    backgroundColor:"#F5EBE0",
  },

  buttonText:{
    fontSize: 18,
    marginTop: 12,
    color: "#C29F8B",
    fontWeight: "bold",
    alignSelf: "center",
  }
});
