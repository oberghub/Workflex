import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl, TextInput, Modal, Alert } from 'react-native';
// import { MYCATEGORIES as data } from "../../data/dummy-data";
// import { EXECISES as posture } from "../../data/dummy-data";
import { db } from '../../database/firebase';
import { collection, addDoc, onSnapshot, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
const MyCoursesScreen = ({ route, navigation }) => {
  // const [courseList, setCourseList] = useState(data)
  const [refreshing, setRefreshing] = useState(false);
  // const [docId, setDocId] = useState(route.params.docId)
  // const [exerciseList, setExerciseList] = useState(posture);
    const user = useSelector((state) => state.user_data.user)
  
  const [courseData, setCourseData] = useState([])
  const [courseDocId, setCourseDocId] = useState([])
  const [postureData, setPostureData] = useState([])
  const [postureDocId, setPostureDocId] = useState([])
  useEffect(() => {

    //Query comment from postId
    const mycourse = query(collection(db, 'mycourse'), where("uid", "==", user.uid))
    // console.log(mycourse)
    onSnapshot(mycourse, (snapshot) => {
      setCourseData(snapshot.docs.map(doc => doc.data()))
      setCourseDocId(snapshot.docs.map(doc => doc.id))
      // console.log("kut"+courseData)
    })
        //Query comment from postId
        const posture = query(collection(db, 'posture'),where("uid","==",user.uid))
        // console.log(posture)
        onSnapshot(posture, (snapshot) => {
          setPostureData(snapshot.docs.map(doc => doc.data()))
          setPostureDocId(snapshot.docs.map(doc => doc.id))
          // console.log(postureData)
        })

  },[])
  // const [postureLen, setPostureLen] = useState(posture.length)
  const sumOfSec = (time) => {
    // console.log(time)
    // const min = parseInt(time.map(time => time.timeDuration+15).reduce((prev, curr) => prev + curr, 0) / 60)
    // const sec = time.map(time => time.timeDuration+15).reduce((prev, curr) => prev + curr) % 60
    // return min == 0 ? " : " + sec + " sec" : " : " + min + " min " + sec + " sec"
  }
  const deleteMyCourse = (docId, id) => {
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
          // onPress: () => {
          //   let lst = [...courseData]
          //   lst.splice(index, 1)
          //   setCourseData(lst)
          //   courseData.splice(index, 1)

          //   //เดี๋ยวค่อยกลับมาแก้
          //   // for (let i = 0; i < 5; i++) {
          //   //   //console.log(posture[i].courseId)
          //   //   if (posture[i].courseId == id) {
          //   //     posture.splice(i, 1)
          //   //   }
          //   //   // console.log(posture[i])
          //   // }
          //   // console.log("Data " + data.length)
          //   // console.log("Posture " + posture)
          //   // // console.log("Exercise " + posture)
          // }
          onPress : () => {
            try{
              deleteDoc(doc(db, 'mycourse', docId))

              //Delete multiple record
              for(let i=0;i<id.length;i++){
                deleteDoc(doc(db, 'posture', postureDocId[id[i]]))
              }
              console.log("delete sucess")
            }
            catch(e){
              console.log(e)
            }
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
  if (courseData.length == 0) {
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

          <FlatList data={courseData}
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
                backgroundColor: item.backgroundColor
              }} key={index}>
                <View style={[styles.gridItem, { padding: 10, paddingTop: 15 }]}>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={[styles.txtImg, { marginBottom: 15 }]}>{item.courseName}</Text>
                      <TouchableOpacity style={{
                      position : 'absolute',
                      right : 0,
                      top : 5
                    }}
                      onPress={() => {

                        deleteMyCourse(courseDocId[index], postureData.map((data, index) => data.byCourseId == item.courseId ? index : null).filter(data => data != null))
                      }}
                      options={({ route }) => ({
                        title: route.params.title.toString(),
                      })}>
                      <Ionicons name='ios-trash-outline' size={20} color={'black'} />

                    </TouchableOpacity>
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: '500' }}>{postureData.filter(posture => posture.byCourseId == item.courseId).length} Posture
                    {sumOfSec(postureData.filter(data => data.byCourseId == item.courseId))}
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
                      navigation.navigate("My Course Detail", { exerciseList: postureData, courseId: item.courseId, title: item.name })
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

