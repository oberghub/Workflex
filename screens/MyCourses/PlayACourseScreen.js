import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import CountDown from 'react-native-countdown-component';


export default function PlayACourse({ route, navigation }) {
  const { postureData } = route.params
  // const timeConvert = (time) => {
  //   const min = Math.floor(time / 60)
  //   const sec = time % 60
  // }

  const [run, setRun] = useState(true);
  const [count, setCount] = useState(0);
  const pause = () => {
    if (run == true) {
      setRun(false);
    } else {
      setRun(true);
    }
  }
  const goNextPose = () => {
    if (count >= postureData.length-1) {
      console.log("finish")
    } else {
      setCount(count + 1);
      console.log(count);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40, fontWeight: '700' }}>{postureData[count].name}</Text>
      <CountDown
        id={count.toString()}
        until={postureData[count].sec}
        size={50}
        onFinish={goNextPose}
        digitTxtStyle={{ color: 'black', fontSize: 80, fontWeight: '500' }}
        digitStyle={{backgroundColor: '#FFF'}}
        timeToShow={['M', 'S']}
        timeLabels={{ m: null, s: null }}
        separatorStyle={{ color: 'black' }}
        showSeparator
        running={run}
      />
      <TouchableOpacity style={{
        height: 50,
        width: '70%',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 20,
      }} onPress={pause}>
        <Text style={{
          fontSize: 22,
          fontWeight: '500'
        }}>Stop</Text>
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