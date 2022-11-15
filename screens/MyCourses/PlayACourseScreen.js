import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function PlayACourse({ route, navigation }) {
  const { postureData } = route.params
  // const timeConvert = (time) => {
  //   const min = Math.floor(time / 60)
  //   const sec = time % 60
  // }

  const [count, setCount] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(postureData[count].timeDuration);
  const [name, setName] = useState(postureData[count].postureName);
  const [recov, setRecov] = useState(15);
  const [recovState, setRecovState] = useState(true)
  const [isActive, setIsActive] = useState(true);
  const [status, setStatus] = useState("Stop");
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    let mySec = null
    // if(count >= postureData.length-1){
    //   console.log("finish")
    //   clearInterval(mySec)
    // }
    if (isActive) {
      mySec = setTimeout(() => {
        setSec((sec) => sec - 1)
        if (count >= postureData.length - 1 && sec == 0) {
          setSec(0)
          setActive(false)
          clearInterval(mySec)
        }
        else if (sec <= 2) {
          setActive(false)
          setShouldShow(false)
          clearInterval(mySec)
        }
      }, 1000)
    }
    else if (!isActive) {
      clearInterval(mySec)
    }
    if (isActive == "reset") {
      if (!recovState) {
        setMin(0)
        setSec(15)
        clearInterval(mySec)
      }
      else {
        setMin(0)
        setSec(postureData[count].timeDuration)
        clearInterval(mySec)
      }
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
    setShouldShow(true)
  }
  const nextPose = () => {
    setIsActive(false)
    setStatus("Resume")
    setShouldShow(true)
    if (recovState) {
      setRecovState(false)
      if (count < postureData.length - 1) {
        setCount(count + 1)
        setName("พัก")
        setSec(recov)
      }
      else {
        setSec(0)
        console.error("Back To Main Page")
        navigation.navigate("My Courses")
      }
    }
    else {
      setRecovState(true)
      setName(postureData[count].postureName)
      setSec(postureData[count].timeDuration)
    }

  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: '700' }}>{name}</Text>
      <Text style={{ fontSize: 80, fontWeight: '500' }}>{Math.floor(sec / 60) < 10 ? '0' + Math.floor(sec / 60) : Math.floor(sec / 60)} : {sec % 60 < 10 ? '0' + sec % 60 : sec % 60}</Text>
      {/* <Stack.Navigator initialRouteName="My Courses" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="My Courses" component={clock} />
      </Stack.Navigator> */}
      {shouldShow ?
        (
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
        ) : null}

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
        backgroundColor: 'orange',
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