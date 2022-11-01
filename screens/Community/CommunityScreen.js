import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function CommunityScreen({route, navigation}) {
  return (
    <View style={styles.container}>
      <Text>Community</Text>
      <Button title='Post Detail' onPress={() => {navigation.navigate('Post Detail')}} />
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
