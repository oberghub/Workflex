import { useState } from 'react';
import { RefreshControl, StyleSheet, Modal, Pressable, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

//Store data to firebase
import { db } from '../../database/firebase';
import { collection, addDoc } from 'firebase/firestore';

import { useSelector } from 'react-redux';

export default function NewCourseScreen({route, navigation}) {
  const [courseName, setCourseName] = useState("")
  const [posture, setPosture] = useState("")
  const [sec, setSec] = useState("30")
  const [postureValidate, setPostureValidate] = useState(true)
  const [courseNameValidate, setCourseNameValidate] = useState(true)
  const [id , setId] = useState(0)

  const [editPosture, setEditPosture] = useState("")
  const [editSec, setEditSec] = useState("")
  const [currentIndex, setCurrentIndex] = useState(null)

  const [modalVisible, setModalVisible] = useState(false)

  const user = useSelector((state) => state.user_data.user)

  function generateLightColorHex() {
    let color = "#";
    for (let i = 0; i < 3; i++)
      color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
    return color;
  }
  const courseIdGenerate = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
  //const randomColor = Math.floor(Math.random()*16777215).toString(16);

  const [exerciseList, setExerciseList] = useState([])

  const [refreshing, setRefreshing] = useState(false);
  const reloadComp = () => {
    setRefreshing(true)

    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const deleteExList = (index) => {
    Alert.alert(
      "Remove",
      "Do you want to remove a posture?",
      [
        {
          text : 'Cancel',
          onPress : () => {console.log("Process has canceled.")},
          style : "cancel"
        },
        {
          text : "OK",
          onPress : () => {
            let lst = [...exerciseList]
            lst.splice(index, 1)
            setExerciseList(lst)
            console.log("Delete complete.")
          }
        }
      ]
    )
  }

  const addExList = (data) => {
    let lst = [...exerciseList]
    lst.push(data)
    setExerciseList(lst)
  }

  const editExList = (data, state) => {
    if(state){
      setEditPosture(data.name)
      setEditSec(data.sec.toString())
    }
    else{
      let lst = [...exerciseList]
      lst[currentIndex].name = data.name
      lst[currentIndex].sec = parseInt(data.sec)
      setExerciseList(lst)
      setCurrentIndex(null)
    }
    setModalVisible(state)
  }

  const CheckpostureValidate = (data) => {
    console.log(data.name)
    if(data.name == "" || data.sec == ""){
      setPostureValidate(false)
    }
    else{
      addExList({name : data.name, sec : parseInt(data.sec), id : data.id })
      setPosture("")
      setPostureValidate(true)
    }
  }
  
  const CheckCourseNameValidate = () => {
    if(courseName == ""){
      setCourseNameValidate(false)
    }
    else{
      setCourseNameValidate(true)
      saveData() //ทำจริงค่อยแก้ตรงฟังก์ชันนี้
    }
  }

  const saveData = () => {
    if(exerciseList.length == 0){
      console.log("exList == 0")
      Alert.alert(
        "Alert",
        "Posture can't be empty",
        [
          {
            text : 'OK',
            onPress : () => {console.log("Process has canceled.")},
            style : "cancel"
          },
        ]
      )
    }
    else{
      const courseId = courseIdGenerate()
      try{
        addDoc(collection(db, "mycourse"), {
          uid : user.uid,
          backgroundColor : generateLightColorHex(),
          courseName : courseName,
          courseId : courseId
        })
      }
      catch(e){
        console.log(e)
      }

      for(let i =0; i < exerciseList.length;i++){
        try{
          addDoc(collection(db, "posture"), {
            uid : user.uid,
            timeDuration : exerciseList[i].sec,
            postureName : exerciseList[i].name,
            byCourseId : courseId
          })
        }
        catch(e){
          console.log(e)
        }
      }
      navigation.navigate("My Course Tab")
      setExerciseList([])
      setCourseName('')
      setId(id+1)
    }
  }
  return (
    <View style={styles.container}>

      <View style={{width : '100%', 
                    padding : 10, 
                    }}>
        <Text>ชื่อคอร์ส {!courseNameValidate ? <Text style={{color:'red'}}>*ต้องการ</Text> : ""}</Text>
        {/* Course name input */}
        <TextInput
          style={styles.coursenameinput}
          onChangeText={setCourseName}
          value={courseName}
        />
      </View>


      <View style={{width : '100%', 
                    padding : 10, 
                    marginBottom : 10, 
                    }}>
       <Text>ท่าออกกำลังกาย {postureValidate ? "" : <Text style={{color:'red'}}>*ต้องการ</Text>}</Text>  

       <View style={{flexDirection : 'row'}}>
        {/* Posture Input */}
        <TextInput
            style={[styles.postureinput, {marginLeft : -1}]}
            onChangeText={setPosture}
            value={posture}
          />
          <View style={[styles.timecon, {}]}>
            <TextInput
              style={styles.secinput}
              width="60%"
              onChangeText={setSec}
              value={sec}
              keyboardType='numeric'
            />
            <Text style={{marginTop : 25}}>วิ</Text>
          </View>
       </View>
       {/* Save posture */}
        <TouchableOpacity style={[styles.saveBox, {backgroundColor : 'lightblue'}]}
                        onPress={() => {
                          CheckpostureValidate({name : posture, sec : sec, id : exerciseList.length+1 })
                        }}>
                        <Ionicons name="ios-add" size={30} color={"white"} /> 
        </TouchableOpacity>
      </View>

      {/* Show a posture */}
      {exerciseList.length == 0 ? <Text style={{textAlign : 'center', fontSize : 32, fontWeight : '700', color : 'lightgray'}}>ยังไม่ได้เพิ่มท่าออกกำลังกาย</Text> : 
      <ScrollView style={{width : '100%', padding : 10}}>
      {exerciseList.map((item, index) => <View key={index} style={[styles.render, {height : 'auto'}]}>
                  <View style={{width : '70%', marginLeft : 15}}>
                    <Text style={{fontSize : 22, fontWeight : '700'}}>{item.name}</Text>
                    <Text style={{fontSize : 16, fontWeight : '500'}}>{item.sec < 60 ? item.sec + " Sec" : parseInt(item.sec/60) + " Min " + item.sec%60 + " Sec"}</Text>
                  </View>
                  <View style={{width : "30%", flexDirection : 'row', backgroundColor : 'blue'}}>
                    <Ionicons style={{position : 'absolute', right : 40}} name="ios-create-outline" size={20} color={"black"}
                    onPress={() => {editExList(item, true)
                                    setCurrentIndex(index)}} /> 
                    <Ionicons style={{position : 'absolute', right : 15,}}  name="ios-trash-outline" size={20} color={"red"} 
                    onPress={() => {deleteExList(index)}} /> 
                  </View>
                </View>)}
      </ScrollView>}

      {/* Save all data */}
      <TouchableOpacity style={[styles.saveBox, {marginTop : 20, backgroundColor : 'lightgreen', width : '98%'}]}
                        refreshControl={
                          <RefreshControl 
                          refreshing={refreshing} 
                          onRefresh={() => {pullMe()}}/>
                        }
                        onPress={() => {
                          CheckCourseNameValidate()
                          reloadComp()
                        }}>
                        <Ionicons name="ios-save" size={20} color={"white"} /> 
        </TouchableOpacity>


        {/* Edit Modal */}
        <View style={[styles.centeredView]}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={{width : '100%', height: 600, marginTop : 'auto'}}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Edit Posture</Text>

                <View style={{flexDirection : 'row'}}>
                <TextInput
                    style={[styles.postureinput, {marginLeft : -1}]}
                    onChangeText={setEditPosture}
                    value={editPosture}
                  />
                  <View style={styles.timecon}>
                    <TextInput
                      style={styles.secinput}
                      keyboardType='numeric'
                      width="50%"
                      onChangeText={setEditSec}
                      value={editSec}
                    />
                    <Text style={{marginTop : 25}}>Sec</Text>
                  </View>

              </View>

                <View style={{flexDirection : 'row'}}>
                  <Pressable
                      style={[styles.button, {marginRight : 15, backgroundColor : '#FF9595'}]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, {backgroundColor : 'lightblue'}]}
                      onPress={() => editExList({name : editPosture, sec : editSec == "" ? 30 : editSec}, false)}
                    >
                      <Text style={styles.textStyle}>Save</Text>
                    </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems : "center",
    padding : 30,
    width : '100%'
  },
  secinput: {
    height: 40,
    width : "100%",
    marginTop : 12,
    marginRight : 10,
    borderWidth: 0.5,
    borderColor : "lightgray",
    borderRadius : 3,
    padding: 10,
  },
  coursenameinput: {
    height: 40,
    width : "100%",
    borderWidth: 0.5,
    borderColor : "lightgray",
    borderRadius : 3,
    padding: 10,
    marginTop : 10
  },
  postureinput: {
    height: 40,
    margin: 12,
    width : "70%",
    borderWidth: 0.5,
    borderColor : "lightgray",
    borderRadius : 3,
    padding: 10,
  },
  addBox : {
    backgroundColor : "lightgray",
    width : "90%",
    height : 100,
    borderRadius : 5,
    alignItems: 'center',
    justifyContent: 'center',
  },  
  timecon : {
    width : "30%",
    flexDirection : 'row',
  },
  render : {
    backgroundColor : "lightblue",
    width : "100%",
    height : 100,
    borderRadius : 5,
    marginBottom : 5,
    padding : 10,
    alignItems: 'center',
    flexDirection : 'row'
  },  
  saveBox : {
    backgroundColor : "lightgray",
    width : "100%",
    height : 40,
    borderRadius : 5,
    alignItems: 'center',
    justifyContent: 'center',
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
    width : '100%',
    height : 500,
    alignItems: "center",
    position : 'absolute',
    bottom : 0,
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


//FlatList Ex
{/* <View style={{width : '100%', 
              padding : 15, 
              }}>
  <FlatList data={exerciseList} renderItem={({item, index}) => {
      return <TouchableOpacity style={styles.render} onPress={() => {deleteExList(index)}}>
              <View style={{width : '70%', marginLeft : 15}}>
                <Text style={{fontSize : 22, fontWeight : '700'}}>{item.name}</Text>
              </View>
              <View style={{width : "30%"}}>
                <Text style={{fontSize : 16, fontWeight : '500'}}>{item.sec} Sec</Text>
              </View>
            </TouchableOpacity>
    }} />  
</View> */}

//ScrollView with map function Ex.
{/* <ScrollView style={{width : '100%'}}>
{exerciseList.map((item, index) => <TouchableOpacity key={index} style={styles.render} onPress={() => {deleteExList(index)}}>
            <View style={{width : '70%', marginLeft : 15}}>
              <Text style={{fontSize : 22, fontWeight : '700'}}>{item.name}</Text>
            </View>
            <View style={{width : "30%"}}>
              <Text style={{fontSize : 16, fontWeight : '500'}}>{item.sec} Sec</Text>
            </View>
          </TouchableOpacity>)}
</ScrollView> */}
