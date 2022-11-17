import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function PlayACourse({ route, navigation }) {
  const { postureData } = route.params

  const [count, setCount] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(postureData[count].timeDuration);
  const [name, setName] = useState(postureData[count].postureName);
  const [img, setImg] = useState(postureData[count].imgEx)
  const [recov, setRecov] = useState(15);
  const [recovState, setRecovState] = useState(true)
  const [isActive, setIsActive] = useState(true);
  const [status, setStatus] = useState("หยุด");
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
      setStatus("เล่นต่อ")
    }
    else if (!isActive) {
      setIsActive(true)
      setStatus("หยุด")
    }
    else {
      setIsActive(true)
      setStatus("เล่นต่อ")
    }
  }
  const toReset = () => {
    setIsActive("reset")
    setShouldShow(true)
  }
  const nextPose = () => {
    setIsActive(false)
    setStatus("เล่นต่อ")
    setShouldShow(true)
    if (recovState) {
      setRecovState(false)
      if (count < postureData.length - 1) {
        setCount(count + 1)
        setName("พัก")
        setImg("")
        setSec(recov)
      }
      else {
        setSec(0)
        console.log("Back To Main Page")
        navigation.navigate("My Courses")
      }
    }
    else {
      setRecovState(true)
      setName(postureData[count].postureName)
      setImg(postureData[count].imgEx)
      setSec(postureData[count].timeDuration)
    }

  }

  return (
    <View style={styles.container}>
      {/* รูปภาพ */}
      {!!img ? 
        <View style={{
        width : '100%',
        alignItems : 'center'
        }}>
        <Image
            style={{width : '80%', height : 250, borderRadius : 10}}
            source={{uri: img}}
        />
        </View>
        :
        null
      }
      <Text style={{ fontSize: 25, fontWeight: '500' }}>{name}</Text>

      <Text style={{ fontSize: 50, fontWeight: '500' }}>{Math.floor(sec / 60) < 10 ? '0' + Math.floor(sec / 60) : Math.floor(sec / 60)} : {sec % 60 < 10 ? '0' + sec % 60 : sec % 60}</Text>
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
      }}  onPress={() => {toReset()}}>
        <Text style={{
          fontSize: 22,
          fontWeight: '500'
        }}>รีเซ็ต</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
        height: 50,
        width: '70%',
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 20,
      }} onPress={() => {nextPose()}}>
        <Text style={{
          fontSize: 22,
          fontWeight: '500'
        }}>ท่าต่อไป</Text>
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