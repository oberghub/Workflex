import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
export default function InnerCourseScreen({route, navigation}) {
  const { title, postureData } = route.params;
  const formatTitle = (text) => {
    return text.slice(0, 1).toUpperCase() + text.toLowerCase().slice(1)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{
        height : 50,
        width : '95%',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
        marginBottom : 15,
        backgroundColor : 'lightgreen'
      }} onPress={() => {navigation.navigate("Play a Course", {postureData : displayedData})}}>
        <Ionicons name='ios-play-outline' size={30} color={'black'} />
        {/* <Text style={{fontSize : 18, fontWeight : '600'}}>Tap to play</Text> */}
      </TouchableOpacity>
       <ScrollView style={{width : '100%', padding : 10}}>
        {postureData.map((item, index) => <View key={index} style={styles.render}>
                    <View style={{width : '70%', marginLeft : 15}}>
                      <Text style={{fontSize : 22, fontWeight : '700'}}>{formatTitle(item.pTitle)}</Text>
                      <Text style={{fontSize : 16, fontWeight : '500'}}>{item.timeDuration < 60 ? item.timeDuration + " Sec" : parseInt(item.timeDuration/60) + " Min " + item.timeDuration%60 + " Sec"}</Text>
                    </View>
                  </View>)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding : 15,
  },
  render : {
    backgroundColor : "lightblue",
    width : "100%",
    height : 100,
    borderRadius : 5,
    marginBottom : 5,
    padding : 10,
    alignItems: 'center',
    flexDirection : 'row'
  },  
});