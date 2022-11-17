import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';

export default function CourseDetailScreen({route, navigation}) {
  const {courseTitle, courseData} = route.params
  const formatTitle = (text) => {
    return text.slice(0, 1).toUpperCase() + text.toLowerCase().slice(1)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{
        width : '100%',
        height : 40,
        backgroundColor : 'lightblue',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
        marginTop : 15,
      }} onPress={() => {navigation.navigate("Inner Course", {title : courseTitle, postureData : courseData.postureData})}}>
        <Text style={{fontSize : 18, fontWeight : '600'}}>เข้าสู่คอร์ส</Text>
      </TouchableOpacity>
      <View style={{
                width : '100%',
                marginTop : 15,
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
                borderRadius : 10,
            }}>
                <Image
                    style={{width : '100%', height : 200, borderRadius : 10}}
                    source={{uri: courseData.image}}
                />
      </View>
      <ScrollView style={{width : '100%'}}>
            <View style={{
                width : '100%',
                height : 'auto',
                backgroundColor : 'white',
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
                borderRadius : 10,
                marginTop : 15,
                padding : 15
            }}>
                <Text style={{fontSize : 24, fontWeight : '700'}}>{courseData.courseTitle}</Text>
                <Text style={{fontSize : 14, fontWeight : '300', marginTop : 10}}>• {courseData.desc}</Text>
                <Text style={{fontSize : 16, fontWeight : '400', marginTop : 10}}>ท่าออกกำลังกาย</Text>
                {courseData.postureData.map((item, index) => {
                return( 
                    <Text key={index} style={{fontSize : 14, fontWeight : '300'}}>- {formatTitle(item.postureName)} {item.timeDuration} วินาที</Text>
                )
                })}
                {/* <Text style={{fontSize : 16, fontWeight : '400', marginTop : 10}}>วิธีทำ</Text>
                <Text style={{fontSize : 14, fontWeight : '300'}}>• {foodData.howTo}</Text> */}
            </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding : 10
  },
});
