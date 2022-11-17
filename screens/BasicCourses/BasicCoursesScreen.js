import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../database/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
const BasicCoursesScreen = ({ navigation }) => {
  const [courseData, setCourseData] = useState([])
  const [filterCourse, setFilterCourse] = useState([])
  const [hasfilter, setFilter] = useState(false)
  const [checkfilter, setCheckFilter] = useState(false)
  const [age, setAge] = useState('')
  useEffect(() => {
    const q = query(collection(db, 'defaultCourse'), orderBy("courseId", 'asc'))
    onSnapshot(q, (snapshot) => {
      setCourseData(snapshot.docs.map(doc => doc.data()))
    })
  }, [])
  const formatTime = (time) => {
    return Math.floor(time / 60) + " นาที " + time % 60 + " วินาที"
  }
  const filterData = () => {
    if (age > 0 && age <= 13) {
      setFilterCourse(courseData.filter(ages => ages.minAge >= 0 && ages.maxAge <= 13))
      setFilter(false)
      setCheckFilter(true)
    }
    else if (age >= 14 && age <= 25) {
      setFilterCourse(courseData.filter(ages => ages.minAge >= 14 && ages.maxAge <= 25))
      setFilter(false)
      setCheckFilter(true)
    }
    else if (age >= 26 && age <= 59) {
      setFilterCourse(courseData.filter(ages => ages.minAge >= 26 && ages.maxAge <= 59))
      setFilter(false)
      setCheckFilter(true)
    }
    else if (age >= 60 && age <= 120) {
      setFilterCourse(courseData.filter(ages => ages.minAge >= 60 && ages.maxAge <= 120))
      setFilter(false)
      setCheckFilter(true)
    }
    else{
      setFilterCourse(courseData);
    }

  }
  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{
        height: 370,
        width: '100%',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#F2F2F2'
      }}>
        <View style={[styles.gridItem]}>
          <Image source={{ uri: item.image }} style={[styles.bgImage]} />
        </View>

        <View style={{ position: 'absolute', width: '95%', top: 160, paddingTop: 10, paddingRight: 10, paddingLeft: 10 }}>

          <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: '700' }}>
            {item.courseTitle}
          </Text>

          <Text style={{ marginLeft: 10, marginTop: 10 }}>
            {"    "}{item.desc}
          </Text>

          <Text style={{ marginLeft: 10, marginTop: 10 }}>
            ท่าออกกำลังกาย <Text style={{ fontWeight: '700' }}>{item.postureData.length}</Text>
          </Text>
          <Text style={{ marginLeft: 10, marginTop: 10 }}>
            เวลารวม{" "}
            <Text style={{ fontWeight: '700' }}>{formatTime(item.postureData.map(data => data.timeDuration).reduce((prev, curr) => (prev + 15) + curr))}</Text>
          </Text>

        </View>

        <TouchableOpacity style={{
          width: '100%',
          height: 40,
          backgroundColor: 'lightblue',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5
        }}
          onPress={() => {
            navigation.navigate("Course Detail", { courseTitle: item.courseTitle, courseData: item })
          }}>
          <Ionicons name='ios-enter-outline' size={20} color={'black'} />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {
        !hasfilter ?
          <TouchableOpacity style={{
            width: '95%', height: 40, backgroundColor: '#ff872b',
            borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 10
          }} onPress={() => { setFilter(!hasfilter) }}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>กรองคอร์ส</Text>
          </TouchableOpacity>
          :
          null
      }
      {hasfilter ?
        <View style={{
          width: '95%',
          height: 'auto',
          backgroundColor: 'white',
          shadowColor: '#171717',
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          borderRadius: 10,
          marginTop: 10, padding: 10
        }}>
          <View style={{ width: '100%' }}>
            <Text style={{ marginBottom: 15, fontSize: 24, fontWeight: '700' }}>แทบกรอง</Text>
            <TouchableOpacity onPress={() => { setFilter(false) }} style={{ position: 'absolute', right: 0 }}>
              <Ionicons name='ios-close-outline' size={25} color={'black'} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ marginBottom: 5 }}>อายุ</Text>
            <TextInput style={{
              width: '40%',
              height: 40,
              borderWidth: 1,
              borderColor: 'lightgray',
              borderRadius: 5, padding: 5
            }}
              placeholder="ใส่อายุของคุณ"
              keyboardType='numeric'
              onChangeText={setAge}
              value={age}
            />
          </View>
          <TouchableOpacity style={{
            width: '20%', height: 40, backgroundColor: 'lightblue',
            borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 10
          }} onPress={() => { filterData() }}>
            <Text style={{ color: 'white' }}>กรอง</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: '20%', height: 40, backgroundColor: 'green',
            borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 10
          }} onPress={() => { setCheckFilter(false) }}>
            <Text style={{ color: 'white' }}>คืนค่า</Text>
          </TouchableOpacity>
        </View>
        :
        null
      }
      <View style={[styles.shadowbox, { width: "100%", padding: 10 }]}>
        <FlatList data={checkfilter === true ? filterCourse:courseData} renderItem={renderItem} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff'
  },
  gridItem: {
    flex: 1,
    marginBottom: 10,
    paddingTop: 5,
    height: 170,
  },
  txtImg: {
    flex: 1,
    //fontFamily: 'Kanit_400Regular', //เอาไว้ค่อย import มาใหม่
    left: 20,
    top: 10,
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 32,
    fontWeight: '700',
    color: "#000",
    position: 'absolute',
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
    marginTop: -5,
    borderRadius: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
  },
});

export default BasicCoursesScreen;

