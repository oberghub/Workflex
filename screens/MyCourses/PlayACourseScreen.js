import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { EXECISES } from "../../data/dummy-data";
export default function PlayACourseScreen({route, navigation, props}) {
  const { courseId } = route.params;
  const catId = courseId;
  const displayedData = EXECISES.filter(
    (execise) => execise.courseId.indexOf(catId) >= 0
  );
  return (
    <View style={styles.container}>
       <ScrollView style={{width : '100%', padding : 10}}>
        {displayedData.map((item, index) => <View key={index} style={styles.render}>
                    <View style={{width : '70%', marginLeft : 15}}>
                      <Text style={{fontSize : 22, fontWeight : '700'}}>{item.name}</Text>
                      <Text style={{fontSize : 16, fontWeight : '500'}}>{item.sec < 60 ? item.sec + " Sec" : parseInt(item.sec/60) + " Min " + item.sec%60 + " Sec"}</Text>
                    </View>
                  </View>)}
      </ScrollView>
      {/* <Text>Play a Course</Text> */}
      <StatusBar style="auto" />
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
