import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function CourseDetailScreen({route, navigation}) {
  return (
    <View style={styles.container}>
      <Text>Course Detail</Text>
      <Button title='Go' onPress={() => {navigation.navigate('Inner Course')}}></Button>
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
