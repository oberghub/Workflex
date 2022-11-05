import { useState } from 'react';
import { StyleSheet, Modal, Pressable, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
export default function NewCourseScreen({route, navigation}) {
  const [courseName, setCourseName] = useState("")
  const [posture, setPosture] = useState("")
  const [sec, setSec] = useState("30")
  const [postureValidate, setPostureValidate] = useState(true)
  const [courseNameValidate, setCourseNameValidate] = useState(true)

  const [editPosture, setEditPosture] = useState("")
  const [editSec, setEditSec] = useState("")
  const [currentIndex, setCurrentIndex] = useState(null)

  const [modalVisible, setModalVisible] = useState(false)

  //Example Data
  const [exerciseList, setExerciseList] = useState([
    {name : "Jumping Jack", sec : 20, id : 1},
    {name : "Sit Up", sec : 25, id : 2}
  ])

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
      setSec("")
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
    console.log({courseName : courseName, exerciseList : exerciseList})
  }
  return (
    <View style={styles.container}>

      <View style={{width : '100%', 
                    padding : 10, 
                    }}>
        <Text>Course Name {!courseNameValidate ? <Text style={{color:'red'}}>*required</Text> : ""}</Text>
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
       <Text>Posture {postureValidate ? "" : <Text style={{color:'red'}}>*required</Text>}</Text>  

       <View style={{flexDirection : 'row'}}>
        {/* Posture Input */}
        <TextInput
            style={[styles.postureinput, {marginLeft : -1}]}
            onChangeText={setPosture}
            value={posture}
          />
          <View style={styles.timecon}>
            <TextInput
              style={styles.secinput}
              width="50%"
              onChangeText={setSec}
              value={sec}
              keyboardType='numeric'
            />
            <Text style={{marginTop : 25}}>Sec</Text>
          </View>
       </View>
       {/* Save posture */}
        <TouchableOpacity style={styles.saveBox}
                        onPress={() => {
                          CheckpostureValidate({name : posture, sec : sec, id : exerciseList.length+1 })
                        }}>
                        <Ionicons name="ios-add" size={30} color={"black"} /> 
        </TouchableOpacity>
      </View>

      {/* Show a posture */}
      <ScrollView style={{width : '100%', padding : 10}}>
        {exerciseList.map((item, index) => <View key={index} style={styles.render}>
                    <View style={{width : '70%', marginLeft : 15}}>
                      <Text style={{fontSize : 22, fontWeight : '700'}}>{item.name}</Text>
                      <Text style={{fontSize : 16, fontWeight : '500'}}>{item.sec < 60 ? item.sec + " Sec" : parseInt(item.sec/60) + " Min " + item.sec%60 + " Sec"}</Text>
                    </View>
                    <View style={{width : "30%", flexDirection : 'row', marginLeft : 10}}>
                      <Ionicons style={{marginRight : 15}} name="ios-create-outline" size={20} color={"black"}
                      onPress={() => {editExList(item, true)
                                      setCurrentIndex(index)}} /> 
                      <Ionicons name="ios-trash-outline" size={20} color={"red"} 
                      onPress={() => {deleteExList(index)}} /> 
                    </View>
                  </View>)}
      </ScrollView>

      {/* Save all data */}
      <TouchableOpacity style={[styles.saveBox, {marginTop : 20}]}
                        onPress={() => {
                          CheckCourseNameValidate()
                        }}>
                        <Ionicons name="ios-save-outline" size={20} color={"black"} /> 
        </TouchableOpacity>


        {/* Edit Modal */}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={{width : '100%', marginTop : '75%'}}>
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
                      style={[styles.button, styles.buttonClose, {marginRight : 15, backgroundColor : '#FF4545'}]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose, {backgroundColor : '#00FF06'}]}
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
    marginTop: 22,
    width : '100%'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
