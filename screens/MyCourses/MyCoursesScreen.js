import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { MYCATEGORIES as data } from "../../data/dummy-data";
import { EXECISES as exerciseList } from "../../data/dummy-data";
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
const MyCoursesScreen = ({navigation})  => {
  const [courseList, setCourseList] = useState(data)
  const [refreshing, setRefreshing] = useState(false);
  const sumOfSec = (time) => {
    const min = parseInt(time.map(time => time.sec).reduce((prev, curr) => prev + curr) / 60)
    const sec = time.map(time => time.sec).reduce((prev, curr) => prev + curr) % 60
    //console.log(time.map(time => time.sec).reduce((prev, curr) => prev + curr))
    return min == 0 ? " : " + sec + " sec" : " : " + min + " min " + sec + " sec"
  }

  const pullMe = () => {
    setRefreshing(true)

    setTimeout(() => {
      setRefreshing(false)
      console.log("eiei")
    }, 1000)
  }

  if(courseList.length == 0){
    return(
    <View style={styles.container}>
      <Text style={{fontSize : 18, fontWeight : '500', color : 'lightgray'}}>OOPS! Not found a course</Text>
      <TouchableOpacity onPress={() => {
              navigation.navigate("New Course")
          }}>
            <Ionicons name="ios-add-circle-outline" size={150} color={'lightgray'}></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity 
        refreshControl={
          <RefreshControl 
          refreshing={refreshing} 
          onRefresh={() => {pullMe()}}/>
        }
        onPress={() => {pullMe()}}
        style={{}}
      >
        <Ionicons name="ios-refresh" size={30} color={'lightgray'}/>
      </TouchableOpacity>
    </View>
    )
  }
  else{
    return (
      <View style={styles.container}>

        <View style={[styles.shadowbox, {width : "100%", padding : 10}]}>

          <FlatList data={courseList} 
          renderItem={({item, index}) => 
              <View style={{height : 150, 
                            width : '100%',
                            borderWidth : 1, 
                            borderColor : 'lightgray', 
                            borderRadius : 10,
                            marginBottom : 15,
                            backgroundColor : item.color}}>      
                <View style={[styles.gridItem, {padding : 10, paddingTop : 15}]}>
                  <Text style={[styles.txtImg, {marginBottom : 15}]}>{item.title}</Text>
                  <Text style={{fontSize : 18, fontWeight : '500'}}>{exerciseList.filter(posture => posture.courseId == item.id).length} Posture 
                  {sumOfSec(exerciseList.filter(data => data.courseId == item.id))}
                  </Text>
                </View>

                <TouchableOpacity style={{width : '100%', 
                                          height : 40, 
                                          backgroundColor : 'lightblue',
                                          alignItems : 'center',
                                          justifyContent : 'center',
                                          borderRadius : 5}}
                  onPress={() => {
                    navigation.navigate("Play a Course", {exerciseList : exerciseList, courseId: item.id, title:item.title})
                    console.log(exerciseList)
                  }}
                  options={({ route }) => ({
                    title: route.params.title.toString(),
                  })}>
                    <Ionicons name='ios-exit-outline' size={20} color={'black'}/>
                </TouchableOpacity>
            </View>
          } />

        </View>
          <Text style={{color : 'lightgray', marginBottom : 9}}>If these list haven't update, please pull page to refresh.</Text>
      </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    flex: 1,
    marginBottom: 10,
    paddingTop:5,
    height: 170,
  },
  txtImg:{
        //fontFamily: 'Kanit_400Regular', //เอาไว้ค่อย import มาใหม่
        fontSize:32,
        fontWeight : '700',
        color:"#000",
        // textShadowColor:'#585858',
        // textShadowOffset:{width: 5, height: 5},
        // textShadowRadius:10,
    },
  shadowbox: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 20,
    justifyContent: "flex-end",
  },
  bgImage: {
    width: "100%",
    height: 250,
    marginTop : -5,
    borderRadius : 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
  },
});

export default MyCoursesScreen;

