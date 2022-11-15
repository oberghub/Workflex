import React, { useState, useCallback, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';

export default function CourseDetailScreen({route, navigation}) {
  const {categoryTitle, postureData} = route.params
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{
        width : '95%',
        height : 40,
        backgroundColor : 'lightblue',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
        marginTop : 15
      }} onPress={() => {console.log(postureData), navigation.navigate("Inner Course", {title : categoryTitle, postureData : postureData})}}>
        <Text style={{fontSize : 18, fontWeight : '600'}}>Start a course</Text>
      </TouchableOpacity>
      <View style={{width : '100%', marginTop : 20}}>
        <Text>hee</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
