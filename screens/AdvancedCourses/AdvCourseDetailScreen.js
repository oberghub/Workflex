import React, { useState, useCallback, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function AdvCourseDetailScreen({route, navigation}) {
  const [playing, setPlaying] = useState(false);
  const {categoryTitle, postureData} = route.params
  let widthDim = Dimensions.get('window').width
  let heightDim = Dimensions.get('window').height

  let ytPlayerHeight = widthDim > 500 ? heightDim / 1.4 : heightDim / 3.8

  const [vidId, setVidId] = useState([
    {vidId : "9D_4FP54Qh0"},
    {vidId : "ayxRtBHw754"},
    {vidId : "KEJvFHdCDu0"},
    {vidId : "ycWuW8C5lQg"},
    {vidId : "MzhXNmqAdL0"},
    {vidId : "D45sa9NNlrY"}
  ])

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{
        width : '95%',
        height : 40,
        backgroundColor : 'lightblue',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
        marginTop : 15
      }} onPress={() => {console.log(postureData), navigation.navigate("Adv Inner Course", {title : categoryTitle, postureData : postureData})}}>
        <Text style={{fontSize : 18, fontWeight : '600'}}>Start a course</Text>
      </TouchableOpacity>
{/* 
      <TouchableOpacity style={{
        width : '95%',
        height : 40,
        backgroundColor : 'lightblue',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
        marginTop : 15
      }} onPress={() => {console.log(widthDim + " x " + heightDim )}}>
        <Text style={{fontSize : 18, fontWeight : '600'}}>Check Dimensions</Text>
      </TouchableOpacity> */}

      <View style={{width : '100%', marginTop : 20}}>
        <FlatList data={vidId}
        renderItem={({item, index}) => 
          <View style={{alignItems : 'center'}}>
            <YoutubePlayer
              webViewStyle={{borderRadius : 10}}
              height={ytPlayerHeight}
              width={"90%"}
              play={playing}
              videoId={item.vidId}
              onChangeState={onStateChange}
            />
          </View>
        }/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
