import React, { useState, useCallback, useRef } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function CourseDetailScreen({route, navigation}) {
  const [playing, setPlaying] = useState(false);

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
      <View style={{width : "100%", padding : 10}}>
        <YoutubePlayer
          webViewStyle={{borderRadius : 10}}
          height={800}
          width={"100%"}
          play={playing}
          videoId={"9D_4FP54Qh0"}
          onChangeState={onStateChange}
        />
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
