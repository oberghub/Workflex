// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Button } from 'react-native';

// export default function BasicCoursesScreen({navigation}) {
//   return (
//     <View style={styles.container}>
//       <Text>Basic Course</Text>
//       <Button title='Go' onPress={() => {navigation.navigate('Course Detail')}}></Button>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React from "react";
import {
  FlatList,
  StyleSheet,
} from "react-native";
import { CATEGORIES } from "../../data/dummy-data";
import CourseLists from "../../components/CourseLists";
const BasicCoursesScreen = ({ navigation }) => {
  const renderGridItem = (itemData) => {
    return (
      <CourseLists
        title={itemData.item.title}
        color={itemData.item.color}
        image={itemData.item.image}
        onSelect={() => {
          // {
          //   navigation.navigate("CategoryMeals", {
          //     categoryId: itemData.item.id,
          //     categoryTitle: itemData.item.title,
          //   });
          //   console.log(itemData.item.id);
          // }
          {navigation.navigate('Course Detail',{categoryTitle: itemData.item.title})}
        }}
        options={({ route }) => ({
          title: route.params.categoryTitle.toString(),
        })}
      />

      // // ส่วนนี้ <View>...</View>ใช้เพื่อการทดลอง และให้คอมเมนต์โค้ดส่วนนี้และเรียกใช้ <CategoryGridTile> ข้างต้นแทน
      // <View style={{ height: 50, width: "40%" }}>
      //   <Text>{itemData.item.title}</Text>
      // </View>
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem}/>

    // ส่วนนี้ <View>...</View>ใช้เพื่อการทดลอง และให้คอมเมนต์โค้ดส่วนนี้และเรียกใช้ <FlatList> ข้างต้นแทน
    // <View>
    //   <Text>Categories Screen</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BasicCoursesScreen;

