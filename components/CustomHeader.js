import {React, useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";


const CustomHeader = (props) => {
  const topSongs = useSelector((state) => state.topSongs.topSongs);
  const token = useSelector((state) => state.token.token);
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const getTrackInfo = () => {
    for (let i = 0; i < 20; i++){
    let url = 'https://api.spotify.com/v1/audio-features/' + topSongs.data.items[i].id;
    axios(url, {      
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          setRed(red + Math.floor(response.data.danceability/0.07692308) + 1);
          setGreen(green + Math.floor(response.data.energy/0.07692308) + 1);
          setBlue(blue +  14 - (Math.floor(response.data.valence/0.07692308) + 1));
        })
        .catch((error) => {
          console.log("error", error.message);
        });
      }
  }

  getTrackInfo();
  



    return (
      <View style={[styles.myStyle, {backgroundColor: 'rgb('+red+','+green+','+blue+')'}]}>
        <TouchableOpacity onPress={props.onSelectHome}>
          <Text style={{ fontSize: 30, fontWeight: "600"}}>
            your 6 months spotify's colour
          </Text>
        </TouchableOpacity>
      </View>
    );
  }


export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height:200,
    paddingHorizontal: "6%",
    paddingVertical: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
