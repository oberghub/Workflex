import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, RefreshControl, TouchableOpacity, Pressable } from 'react-native';
import { db } from '../../database/firebase';
import { useSelector } from 'react-redux';
import { collection, addDoc, onSnapshot, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function MealScreen({ route, navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector((state) => state.user_data.user)

  const [courseData, setCourseData] = useState([])
  const [courseDocId, setCourseDocId] = useState([])
  const [postureData, setPostureData] = useState([])
  const [postureDocId, setPostureDocId] = useState([])

  useEffect(() => {
    // const mycourse = query(collection(db, 'mycourse'), where("uid", "==", user.uid))
    // onSnapshot(mycourse, (snapshot) => {
    //   setCourseData(snapshot.docs.map(doc => doc.data()))
    //   setCourseDocId(snapshot.docs.map(doc => doc.id))
    // })
  })

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
                    position: 'absolute',
                    right: 0,
                    top: 5
                  }}>
                    <Ionicons name='ios-trash-outline' size={20} color={'black'} />

                  </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>{postureData.filter(posture => posture.byCourseId == item.courseId).length}
                </Text>
              </View>

              <View style={{ flexDirection: 'column' }}>
                <Pressable style={{
                  width: '100%',
                  height: 40,
                  backgroundColor: 'lightblue',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5
                }}
                  options={({ route }) => ({
                    title: route.params.title,
                  })}>
                  <Ionicons name='ios-enter-outline' size={20} color={'black'} />
                </Pressable>
              </View>
            </View>

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