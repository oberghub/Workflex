import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl, TextInput, Modal, Alert } from 'react-native';
import { MYCATEGORIES as data } from "../../data/dummy-data";
import { EXECISES as posture } from "../../data/dummy-data";
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
const MyCoursesScreen = ({ navigation }) => {
  const [courseList, setCourseList] = useState(data)
  const [refreshing, setRefreshing] = useState(false);
  const [exerciseList, setExerciseList] = useState(posture);
  // const [postureLen, setPostureLen] = useState(posture.length)
  const sumOfSec = (time) => {
    const min = parseInt(time.map(time => time.sec+15).reduce((prev, curr) => prev + curr) / 60)
    const sec = time.map(time => time.sec+15).reduce((prev, curr) => prev + curr) % 60
    return min == 0 ? " : " + sec + " sec" : " : " + min + " min " + sec + " sec"
  }
  // const [data, setMyCourse] = useState([
  //   // {name : "Jumping Jack", sec : 20, id : 1},
  //   // {name : "Sit Up", sec : 25, id : 2}
  // ])
  const deleteMyCourse = (index, id) => {
    Alert.alert(
      "Remove",
      "Do you want to remove a course?",
      [
        {
          text: 'Cancel',
          onPress: () => { console.log("Process has canceled.") },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            let lst = [...data]
            lst.splice(index, 1)
            setCourseList(lst)
            data.splice(index, 1)

            //เดี๋ยวค่อยกลับมาแก้
            // for (let i = 0; i < 5; i++) {
            //   //console.log(posture[i].courseId)
            //   if (posture[i].courseId == id) {
            //     posture.splice(i, 1)
            //   }
            //   // console.log(posture[i])
            // }
            // console.log("Data " + data.length)
            // console.log("Posture " + posture)
            // // console.log("Exercise " + posture)
          }
        }
      ]
    )
  }
  const pullMe = () => {
    setRefreshing(true)

    setTimeout(() => {
      setRefreshing(false)
      console.log("Refresh...")
    }, 1000)
  }
  if (data.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, fontWeight: '500', color: 'lightgray' }}>OOPS! Not found a course</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("New Course")
        }}>
          <Ionicons name="ios-add-circle-outline" size={150} color={'lightgray'}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => { pullMe() }} />
          }
          onPress={() => { pullMe() }}
          style={{}}
        >
          <Ionicons name="ios-refresh" size={30} color={'lightgray'} />
        </TouchableOpacity>
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>

        <View style={[styles.shadowbox, { width: "100%", padding: 10 }]}>

          <FlatList data={data}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => { pullMe() }} />
              }
            renderItem={({ item, index }) =>
              <View style={{
                height: 150,
                width: '100%',
                borderWidth: 1,
                borderColor: 'lightgray',
                borderRadius: 10,
                marginBottom: 15,
                backgroundColor: item.color
              }} key={index}>
                <View style={[styles.gridItem, { padding: 10, paddingTop: 15 }]}>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={[styles.txtImg, { marginBottom: 15 }]}>{item.title}</Text>
                      <TouchableOpacity style={{
                      position : 'absolute',
                      right : 0,
                      top : 5
                    }}
                      onPress={() => {

                        deleteMyCourse(index, item.id)
                      }}
                      options={({ route }) => ({
                        title: route.params.title.toString(),
                      })}>
                      <Ionicons name='ios-trash-outline' size={20} color={'black'} />

                    </TouchableOpacity>
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: '500' }}>{exerciseList.filter(posture => posture.courseId == item.id).length} Posture
                    {sumOfSec(exerciseList.filter(data => data.courseId == item.id))}
                  </Text>
                </View>

                <View style={{flexDirection : 'column'}}>
                  <Pressable style={{
                    width: '100%',
                    height: 40,
                    backgroundColor: 'lightblue',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5
                  }}
                    onPress={() => {
                      navigation.navigate("My Course Detail", { exerciseList: exerciseList, courseId: item.id, title: item.title })
                    }}
                    options={({ route }) => ({
                      title: route.params.title.toString(),
                    })}>
                    <Ionicons name='ios-enter-outline' size={20} color={'black'} />

                  </Pressable>
                </View>
              </View>

            } />
        </View>
        <Text style={{ color: 'lightgray', marginBottom: 9 }}>If these list haven't update, please pull page to refresh.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : 'white'
  },
  gridItem: {
    flex: 1,
    marginBottom: 10,
    paddingTop: 5,
    height: 170,
  },
  txtImg: {
    //fontFamily: 'Kanit_400Regular', //เอาไว้ค่อย import มาใหม่
    fontSize: 32,
    fontWeight: '700',
    color: "#000",
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
    marginTop: -5,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    width: '100%',
    height: 500,
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center"
  }
});

export default MyCoursesScreen;

