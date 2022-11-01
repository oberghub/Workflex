import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';

export default function MyCoursesScreen({route, navigation}) {
  // const itemData = (data) => {
  //   return(
    
  //   )
  // }
  return (
    <View style={styles.container}>
      {/* <View style={{
        width : "90%",
        height : 150,
        borderRadius : 10,
        backgroundColor : "lightblue"
      }}>
      </View> */}
      <Text>My Course</Text>
      <Button title="Go to work out!" onPress={() => {navigation.navigate("Play a Course")}} />
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
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    alignItems: 'center',
  },
});
