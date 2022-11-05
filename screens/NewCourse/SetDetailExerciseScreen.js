import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function SetDetailExerciseScreen({route, navigation}) {
  const [posture, setPosture] = useState("")
  const [sec, setSec] = useState("")
  const [exerciseList, setExerciseList] = useState([])
  return (
    <View style={styles.container}>
      <Text>Set Exercise Detail</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPosture}
        value={posture}
      />
      <View style={styles.timecon}>
        <TextInput
          style={styles.input}
          width="50%"
          onChangeText={setSec}
          value={sec}
        />
        <Text style={{marginTop : 25}}>Sec</Text>
      </View>
      <TouchableOpacity style={styles.saveBox}
                        onPress={() => {
                          navigation.goBack()
                        }}>
                        <Text>Save</Text>
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
  timecon : {
    width : "95%",
    flexDirection : 'row'
  },
  input: {
    height: 40,
    margin: 12,
    width : "90%",
    borderWidth: 0.5,
    borderColor : "lightgray",
    borderRadius : 3,
    padding: 10,
  },
  saveBox : {
    backgroundColor : "lightgray",
    width : "90%",
    height : 40,
    borderRadius : 5,
    alignItems: 'center',
    justifyContent: 'center',
  },  
});
