import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function BasicCoursesScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Basic Course</Text>
      <Button title='Go' onPress={() => {navigation.navigate('Course Detail')}}></Button>
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
});
