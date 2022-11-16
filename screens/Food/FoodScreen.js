import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { db } from '../../database/firebase';
import { useSelector } from 'react-redux';
import { collection, addDoc, onSnapshot, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function MealScreen({ route, navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector((state) => state.user_data.user)

  //ข้อมูลตัวอย่าง
  const [foodData, setFoodData] = useState([
    { //ย้ำ ข้อมูลตัวอย่าง
      foodTitle : 'Beef Burger',
      desc : 'หร่อยจัดหร่อยจัดหร่อยจัดหร่อยจัดหร่อยจัดหร่อยจัดหร่อยจัดหร่อยจัดหร่อยจัดหร่อยจัดหร่อยจัดหร่อยจัดหร่อยจัดหร่อยจัด',
      image : 'https://cdn.britannica.com/31/122031-050-F8FCA663/Hamburger-cheeseburger.jpg',
      ingradient : [
        { ingradientName : "Ground Beef", weight : 100, calories : 250.5 }, //weight เป็นกรัม
        { ingradientName : "Bread", weight : 40, calories : 105.64 },
        { ingradientName : "Cheese", weight : 21, calories : 70 },
      ]
    }
  ])

  useEffect(() => {
    // const mycourse = query(collection(db, 'mycourse'), where("uid", "==", user.uid))
    // onSnapshot(mycourse, (snapshot) => {
    //   setCourseData(snapshot.docs.map(doc => doc.data()))
    //   setCourseDocId(snapshot.docs.map(doc => doc.id))
    // })
  }, [])

  return (
    <View style={styles.container}>
      <View style={[styles.shadowbox, { width: "100%", padding: 10}]}>

        <FlatList data={foodData}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => { pullMe() }} />
          }
          renderItem={({ item, index }) =>
              <TouchableOpacity style={{
                width : "100%",
                height : 180,
                backgroundColor : '#white',
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
                marginTop : 15,
                borderRadius : 10,
              }} key={index}>
                <View style={{flexDirection : 'row'}}>
                  <View style={{width : '30%', height : 180}}>
                    <Image
                      style={{width : '100%', height : 180, borderRadius : 10}}
                      source={{uri: item.image}}
                    />
                  </View>
                  <View style={{width : '70%', height : 180, padding : 15}}>
                      <Text style={{fontSize : 26, fontWeight : '700'}}>{item.foodTitle}</Text>
                      <Text style={{fontSize : 16, fontWeight : '500', marginTop : 10}}>    {item.desc}</Text>
                  </View>
                </View>
              </TouchableOpacity>
          } />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },
  gridItem: {
    flex: 1,
    marginBottom: 10,
    paddingTop: 5,
    height: 170,
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