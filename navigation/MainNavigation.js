import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";


//Basic Course
import BasicCoursesScreen from "../screens/BasicCourses/BasicCoursesScreen";
import CourseDetailScreen from "../screens/BasicCourses/CourseDetailScreen";
import InnerCourseScreen from "../screens/BasicCourses/InnerCourseScreen";

//My Course
import MyCoursesScreen from "../screens/MyCourses/MyCoursesScreen";
import MyCourseDetail from "../screens/MyCourses/MyCourseDetailScreen";
import PlayACourseScreen from "../screens/MyCourses/PlayACourseScreen";

//New Course
import NewCourseScreen from "../screens/NewCourse/NewCourseScreen";

//Community
import CommunityScreen from "../screens/Community/CommunityScreen";
import PostDeatilScreen from "../screens/Community/PostDetailScreen";

//Food
import FoodScreen from "../screens/Food/FoodScreen";

//Auth
import { LoginScreen } from "../screens/AuthScreen/LoginScreen";
import { SignUpScreen } from "../screens/AuthScreen/SignUpScreen";

//Custom Drawer
import { DrawerContent } from "../screens/DrawerContent";

//Redux
import { useSelector } from "react-redux";
import { FoodDetail } from "../screens/Food/FoodDetail";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const NewCourse = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="New Course" component={NewCourseScreen} options={{
        headerBackground: () => 
          <LinearGradient
          colors={['#FF512F','#DD2476']}
          style={{height: '100%'}}
        />,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: ((props) => {
          return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => { navigation.openDrawer() }} />
        }),
        title: "คอร์สใหม่"
      }} />
    </Stack.Navigator>
  )
}
const BasicCourses = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Basic Course">
      {/* เดะมาเปลี่ยนชื่อ detail กับ inner */}
      <Stack.Screen name="Basic Course" component={BasicCoursesScreen} options={{
        headerBackground: () => 
        <LinearGradient
        colors={['#FF512F','#DD2476']}
        style={{height: '100%'}}
      />,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: ((props) => {
          return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => { navigation.openDrawer() }} />
        }),
        title: "คอร์สพื้นฐาน"
      }} />
      <Stack.Screen name="Course Detail" component={CourseDetailScreen} options={({ route }) => ({
        title: route.params.courseTitle, 
        headerBackground: () => 
        <LinearGradient
        colors={['#FF512F','#DD2476']}
        style={{height: '100%'}}
      />,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: ((props) => {
          return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => { navigation.openDrawer() }} />
        })
      })} />
      <Stack.Screen name="Inner Course" component={InnerCourseScreen} options={({ route }) => ({
        title: route.params.title, headerStyle: {
          backgroundColor: '#FD841F',
        },
        headerBackground: () => 
        <LinearGradient
        colors={['#FF512F','#DD2476']}
        style={{height: '100%'}}
      />,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: ((props) => {
          return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => { navigation.openDrawer() }} />
        }),
      })} />
    </Stack.Navigator>
  )
}
const MyCourses = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="My Courses">
      {/* เดะมาเปลี่ยนชื่อ detail กับ inner */}
      <Stack.Screen name="My Courses" component={MyCoursesScreen} options={{
        headerBackground: () => 
        <LinearGradient
        colors={['#FF512F','#DD2476']}
        style={{height: '100%'}}
      />,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: ((props) => {
          return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => { navigation.openDrawer() }} />
        }),
        title: "คอร์สของฉัน"
      }} />
      <Stack.Screen name="My Course Detail" component={MyCourseDetail} options={({ route }) => ({
        title: route.params.title,
        headerBackground: () => 
        <LinearGradient
        colors={['#FF512F','#DD2476']}
        style={{height: '100%'}}
      />,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: ((props) => {
          return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => { navigation.openDrawer() }} />
        }),
      })} />
      <Stack.Screen name="Play a Course" component={PlayACourseScreen} options={{
        headerBackground: () => 
        <LinearGradient
        colors={['#FF512F','#DD2476']}
        style={{height: '100%'}}
      />,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: ((props) => {
          return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => { navigation.openDrawer() }} />
        }),
        title: "เล่นคอร์ส"
      }} />
    </Stack.Navigator>
  )
}
const Community = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Community">
      {/* เดะมาเปลี่ยนชื่อ detail กับ inner */}
      <Stack.Screen name="Community" component={CommunityScreen} options={{
        headerBackground: () => 
        <LinearGradient
        colors={['#FF512F','#DD2476']}
        style={{height: '100%'}}
      />,
        headerRight: ((props) => {
          return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => { navigation.openDrawer() }} />
        }),
        headerTintColor: "white",
        title: "สังคม"
      }} />
      <Stack.Screen name="Post Detail" component={PostDeatilScreen} options={{
        headerBackground: () => 
        <LinearGradient
        colors={['#FF512F','#DD2476']}
        style={{height: '100%'}}
      />,
        headerRight: ((props) => {
          return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => { navigation.openDrawer() }} />
        }),
        headerTintColor: "white",
        title: "รายละเอียดโพสต์"
      }} />
    </Stack.Navigator>
  )
}
const Food = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HealthyFood">
      {/* เดะมาเปลี่ยนชื่อ detail กับ inner */}
      <Stack.Screen name="HealtyFood" component={FoodScreen} options={{
        headerBackground: () => 
        <LinearGradient
        colors={['#FF512F','#DD2476']}
        style={{height: '100%'}}
      />,
        headerRight: ((props) => {
          return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => { navigation.openDrawer() }} />
        }),
        headerTintColor: "white",
        title: "อาหารเพื่อสุขภาพ"
      }} />
      <Stack.Screen name="FoodDetail" component={FoodDetail} options={({ route }) => ({
        headerBackground: () => 
        <LinearGradient
        colors={['#FF512F','#DD2476']}
        style={{height: '100%'}}
      />,
        headerRight: ((props) => {
          return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => { navigation.openDrawer() }} />
        }),
        headerTintColor: "white", title: route.params.foodData.foodTitle
      })} />
    </Stack.Navigator>
  )
}
const MainCoursesTab = () => {
  return (
    <Tab.Navigator initialRouteName="My Course Tab">
      <Tab.Screen name="New Course Tab" component={NewCourse}
        options={{
          title: "เพิ่มคอร์ส",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="ios-add-outline" size={size} color={color} />
          },
          headerShown: false,
        }} />
      <Tab.Screen name="Basic Course Tab" component={BasicCourses}
        options={{
          title: "คอร์สพื้นฐาน",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="ios-barbell-outline" size={size} color={color} />
          },
          headerShown: false
        }} />
      <Tab.Screen name="My Course Tab" component={MyCourses}
        options={{
          title: "คอร์สของฉัน",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="ios-home" size={size} color={color} />
          },
          headerShown: false
        }} />
      <Tab.Screen name="Food Tab" component={Food}
        options={{
          title: "อาหาร",
          tabBarIcon: ({ color, size }) => {
            return <MaterialCommunityIcons name="food-outline" size={size} color={color} />
          },
          headerShown: false
        }} />
      <Tab.Screen name="Community Tab" component={Community}
        options={{
          title: "สังคม",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="ios-people-outline" size={size} color={color} />
          },
          headerShown: false
        }} />
    </Tab.Navigator>
  )
}
const MainNavigation = () => {
  const user = useSelector(state => state.user_data.user)
  return (
    <NavigationContainer>
      {!user ?
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Login" component={LoginScreen}
            options={{
              headerBackground: () => 
              <LinearGradient
              colors={['#FF512F','#DD2476']}
              style={{height: '100%'}}
            />,
              headerTintColor: 'white',
              title: ""
            }} />
          <Drawer.Screen name="SignUp" component={SignUpScreen}
            options={{
              headerBackground: () => 
              <LinearGradient
              colors={['#FF512F','#DD2476']}
              style={{height: '100%'}}
            />,
              headerTintColor: 'white',
              title: ""
            }} />
        </Drawer.Navigator>
        :
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={MainCoursesTab} options={{
            headerShown: false,
          }} />
        </Drawer.Navigator>
      }
    </NavigationContainer>
  )
}
export default MainNavigation;
