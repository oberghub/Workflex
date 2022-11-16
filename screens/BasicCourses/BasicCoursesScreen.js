import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../database/firebase';
import { collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
const BasicCoursesScreen = ({navigation})  => {
  const [courseData, setCourseData] = useState([])
  useEffect(() => {
    const q = query(collection(db, 'defaultCourse'), orderBy("courseId", 'asc'))
    onSnapshot(q, (snapshot) => {
        setCourseData(snapshot.docs.map(doc => doc.data()))
    })
  }, [])
  const formatTime = (time) => {
    return Math.floor(time/60) + " นาที " + time%60 +  " วินาที"
  }
  const renderItem = ({item, index}) => {
    return(
      <View key={index} style={{height : 370, 
        width : '100%',
        borderWidth : 1, 
        borderColor : 'lightgray', 
        borderRadius : 5,
        marginBottom : 15,
        backgroundColor : '#F2F2F2'}}>      
        <View style={[styles.gridItem]}>
        <Image source={{ uri: item.image }} style={[styles.bgImage]}/>
        </View>

        <View style={{position : 'absolute', width : '95%', top : 160, paddingTop : 10, paddingRight : 10, paddingLeft : 10}}>

        <Text style={{marginLeft : 10, fontSize : 16, fontWeight : '700'}}>
          {item.courseTitle}
        </Text>

        <Text style={{marginLeft : 10, marginTop : 10}}>
          {"    "}{item.desc}
        </Text>

        <Text style={{marginLeft : 10, marginTop : 10}}>
          ท่าออกกำลังกาย <Text style={{fontWeight : '700'}}>{item.postureData.length}</Text>
        </Text>
        <Text style={{marginLeft : 10, marginTop : 10}}>
          เวลารวม{" "}
        <Text style={{fontWeight : '700'}}>{formatTime(item.postureData.map(data => data.timeDuration).reduce((prev, curr) => (prev+15) + curr))}</Text>
        </Text>

        </View>

        <TouchableOpacity style={{width : '100%', 
                            height : 40, 
                            backgroundColor : 'lightblue',
                            alignItems : 'center',
                            justifyContent : 'center',
                            borderRadius : 5}}
        onPress={() => {
        navigation.navigate("Course Detail", {courseTitle : item.courseTitle, courseData : item})
        }}>
        <Ionicons name='ios-enter-outline' size={20} color={'black'}/>
        </TouchableOpacity>
        </View>
      )
  }
  return (
    <View style={styles.container}>

      <View style={[styles.shadowbox, {width : "100%", padding : 10}]}>
        <FlatList data={courseData} renderItem={renderItem} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : '#fff'
  },
  gridItem: {
    flex: 1,
    marginBottom: 10,
    paddingTop:5,
    height: 170,
  },
  txtImg:{
    flex: 1,
    //fontFamily: 'Kanit_400Regular', //เอาไว้ค่อย import มาใหม่
    left : 20,
    top : 10,
    justifyContent: "center",
    alignSelf: "center",
    fontSize:32,
    fontWeight : '700',
    color:"#000",
    position : 'absolute',
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
    height: 150,
    marginTop : -5,
    borderRadius : 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
  },
});

export default BasicCoursesScreen;

