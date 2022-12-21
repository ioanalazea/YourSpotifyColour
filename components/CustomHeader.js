import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";


const CustomHeader = (props) => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={props.onSelectHome}>
          <Text style={{ fontSize: 30, fontWeight: "600"}}>
            your spotify's colour
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
