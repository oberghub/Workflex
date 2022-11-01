import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function NewCourseScreen({route, navigation}) {
  return (
    <View style={styles.container}>
      <Text>New Course</Text>
      <Button title='Set Detail' onPress={() => {navigation.navigate('Set Exercise Detail')}} />
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
