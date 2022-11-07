import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function PlayACourse({route, navigation}) {
  const {postureData} = route.params
  const timeConvert = (time) => {
    const min = Math.floor(time/60)
    const sec = time%60
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize : 40, fontWeight : '700'}}>Jumping Jack</Text>
      <Text style={{fontSize : 80, fontWeight : '500'}}>00 : 00</Text>
      <TouchableOpacity style={{
          height : 50,
          width : '70%',
          backgroundColor : 'lightblue',
          alignItems : 'center',
          justifyContent : 'center',
          borderRadius : 5,
        }}>
        <Text style={{fontSize : 22,
          fontWeight : '500'}}>Stop</Text>
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