//ใช้กับ BasicCourses และ MyCourses
import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity, View, Text, StyleSheet, ImageBackground } from "react-native";
import {
    useFonts,
    Kanit_100Thin,
    Kanit_100Thin_Italic,
    Kanit_200ExtraLight,
    Kanit_200ExtraLight_Italic,
    Kanit_300Light,
    Kanit_300Light_Italic,
    Kanit_400Regular,
    Kanit_400Regular_Italic,
    Kanit_500Medium,
    Kanit_500Medium_Italic,
    Kanit_600SemiBold,
    Kanit_600SemiBold_Italic,
    Kanit_700Bold,
    Kanit_700Bold_Italic,
    Kanit_800ExtraBold,
    Kanit_800ExtraBold_Italic,
    Kanit_900Black,
    Kanit_900Black_Italic,
  } from '@expo-google-fonts/kanit';
const CourseLists = (props) => { 
    let [fontsLoaded] = useFonts({
        Kanit_100Thin,
        Kanit_100Thin_Italic,
        Kanit_200ExtraLight,
        Kanit_200ExtraLight_Italic,
        Kanit_300Light,
        Kanit_300Light_Italic,
        Kanit_400Regular,
        Kanit_400Regular_Italic,
        Kanit_500Medium,
        Kanit_500Medium_Italic,
        Kanit_600SemiBold,
        Kanit_600SemiBold_Italic,
        Kanit_700Bold,
        Kanit_700Bold_Italic,
        Kanit_800ExtraBold,
        Kanit_800ExtraBold_Italic,
        Kanit_900Black,
        Kanit_900Black_Italic,
      });
      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
  return (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => {
        props.onSelect();
      }}
    >
      <View
        style={{ ...styles.container }}
      >
         <ImageBackground
              source={{ uri: props.image }} imageStyle={{ borderRadius: 10}} style={styles.bgImage}
            ><Text style={styles.txtImg}>
                {props.title}
                </Text></ImageBackground>
        {/* <Text>{itemData.item.title}</Text> */}
      </View>
    </TouchableOpacity>
  );
    }
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 0,
    paddingTop:5,
    height: 500,
  },
  txtImg:{
        flex: 1,
        fontFamily: 'Kanit_400Regular',
        marginTop:150,
        justifyContent: "center",
        alignSelf: "center",
        fontSize:100,
        color:"#00FF7F",
        textShadowColor:'#585858',
        textShadowOffset:{width: 5, height: 5},
        textShadowRadius:10,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 20,
    // backgroundColor:"black",
    justifyContent: "flex-end",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
  },
});

export default CourseLists;
