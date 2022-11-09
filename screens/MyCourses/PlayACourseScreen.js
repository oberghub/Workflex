import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import clock from "./countdown"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList } from 'react-native-gesture-handler';

export default function PlayACourse({ route, navigation }) {
  const { postureData } = route.params
  // const timeConvert = (time) => {
  //   const min = Math.floor(time / 60)
  //   const sec = time % 60
  // }
  const Stack = createNativeStackNavigator();

  const [count, setCount] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(postureData[count].sec);
  const [show, setShow] = useState(false)
  const [isActive, setIsActive] = useState(true);
  const [status, setStatus] = useState("Stop");

  useEffect(() => {
    let mySec = null
    // if(count >= postureData.length-1){
    //   console.log("finish")
    //   clearInterval(mySec)
    // }
    if (isActive) {
      mySec = setTimeout(() => {
        setSec((sec) => sec - 1)
        console.log(count)
        if (count >= postureData.length - 1 && sec == 0) {
          setSec(0)
          setActive(false)
          clearInterval(mySec)
        }
        else if (sec <= 2) {
          setActive(false)
          clearInterval(mySec)
        }
      }, 1000)
    }
    else if (!isActive) {
      clearInterval(mySec)
    }
    if (isActive == "reset") {
      setMin(0)
      setSec(postureData[count].sec)
      clearInterval(mySec)
    }
  })
  const setActive = () => {
    if (isActive) {
      setIsActive(false)
      setStatus("Resume")
    }
    else if (!isActive) {
      setIsActive(true)
      setStatus("Stop")
    }
    else {
      setIsActive(true)
      setStatus("Resume")
    }
  }
  const toReset = () => {
    setIsActive("reset")
  }
  const nextPose = () => {
    if (count < postureData.length-1) {
      setCount(count + 1)
      setSec(postureData[count].sec)
    }
    else{
      console.error("No more Exercise")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: '700' }}>{postureData[count].name}</Text>
      <Text style={{ fontSize: 80, fontWeight: '500' }}>{min < 10 ? '0' : ''}{sec > 59 ? setMin(min + 1) : min} : {sec < 10 ? '0' : ''}{sec > 59 ? setSec(0) : sec}</Text>
      {/* <Stack.Navigator initialRouteName="My Courses" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="My Courses" component={clock} />
      </Stack.Navigator> */}
      <TouchableOpacity style={{
        height: 50,
        width: '70%',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 20,
      }} onPress={setActive}>
        <Text style={{
          fontSize: 22,
          fontWeight: '500'
        }}>{status}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        height: 50,
        width: '70%',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 20,
      }}>
        <Text style={{
          fontSize: 22,
          fontWeight: '500'
        }} onPress={toReset}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        height: 50,
        width: '70%',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 20,
      }}>
        <Text style={{
          fontSize: 22,
          fontWeight: '500'
        }} onPress={nextPose}>Go Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});