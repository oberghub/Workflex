import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

//Basic Course
import BasicCoursesScreen from "../screens/BasicCourses/BasicCoursesScreen";
import CourseDetailScreen from "../screens/BasicCourses/CourseDetailScreen";
import InnerCourseScreen from "../screens/BasicCourses/InnerCourseScreen";

//Advance Course
import AdvancedCoursesScreen from "../screens/AdvancedCourses/AdvancedCoursesScreen";
import AdvCourseDetailScreen from "../screens/AdvancedCourses/AdvCourseDetailScreen";
import AdvInnerCourseScreen from "../screens/AdvancedCourses/AdvInnerCourseScreen";

//My Course
import MyCoursesScreen from "../screens/MyCourses/MyCoursesScreen";
import MyCourseDetail from "../screens/MyCourses/MyCourseDetailScreen";
import PlayACourseScreen from "../screens/MyCourses/PlayACourseScreen";

import HealthCalculatorScreen from "../screens/Calculate/HealthCalcutarorScreen";

//New Course
import NewCourseScreen from "../screens/NewCourse/NewCourseScreen";
import SetDetailExerciseScreen from "../screens/NewCourse/SetDetailExerciseScreen";

//Community
import CommunityScreen from "../screens/Community/CommunityScreen";
import PostDeatilScreen from "../screens/Community/PostDetailScreen";

//Auth
import {LoginScreen} from "../screens/AuthScreen/LoginScreen";
import {SignUpScreen} from "../screens/AuthScreen/SignUpScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const NewCourse = ({navigation}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="New Course" component={NewCourseScreen} options={{
            headerStyle: {
              backgroundColor: '#FD841F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight : ((props) => {
              return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => {navigation.openDrawer()}} />
            }),
        }}/>
            <Stack.Screen name="Set Exercise Detail" component={SetDetailExerciseScreen}/>
        </Stack.Navigator>
    )
}
const BasicCourses = ({navigation}) => {
    return(
        <Stack.Navigator initialRouteName="Basic Course">
            {/* เดะมาเปลี่ยนชื่อ detail กับ inner */}
            <Stack.Screen name="Basic Course" component={BasicCoursesScreen}   options={{
          headerStyle: {
            backgroundColor: '#FD841F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight : ((props) => {
            return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => {navigation.openDrawer()}} />
          }),
        }}/>
            <Stack.Screen name="Course Detail" component={CourseDetailScreen}  options={({ route }) => ({
            title: route.params.categoryTitle.toString(),headerStyle: {
                backgroundColor: '#FD841F',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerRight : ((props) => {
                return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => {navigation.openDrawer()}} />
              }),
        })}/>
            <Stack.Screen name="Inner Course" component={InnerCourseScreen} options={({route}) => ({
            title: route.params.title.toString(),headerStyle: {
              backgroundColor: '#FD841F',
            },
            headerStyle: {
              backgroundColor: '#FD841F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight : ((props) => {
              return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => {navigation.openDrawer()}} />
            }),
          })}/>
        </Stack.Navigator>
    )
}
const AdvancedCourses = ({navigation}) => {
  return(
      <Stack.Navigator initialRouteName="Advanced Course">
          <Stack.Screen name="Advanced Course" component={AdvancedCoursesScreen}   options={{
        headerStyle: {
          backgroundColor: '#FD841F',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight : ((props) => {
          return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => {navigation.openDrawer()}} />
        }),
      }}/>
          <Stack.Screen name="Adv Course Detail" component={AdvCourseDetailScreen}  options={({ route }) => ({
          title: route.params.categoryTitle.toString(),headerStyle: {
              backgroundColor: '#FD841F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight : ((props) => {
              return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => {navigation.openDrawer()}} />
            }),
      })}/>
          <Stack.Screen name="Adv Inner Course" component={AdvInnerCourseScreen} options={({route}) => ({
          title: route.params.title.toString(),headerStyle: {
            backgroundColor: '#FD841F',
          },
          headerStyle: {
            backgroundColor: '#FD841F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight : ((props) => {
            return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => {navigation.openDrawer()}} />
          }),
        })}/>
      </Stack.Navigator>
  )
}
const MyCourses = ({navigation}) => {
    return(
        <Stack.Navigator initialRouteName="My Courses">
            {/* เดะมาเปลี่ยนชื่อ detail กับ inner */}
          <Stack.Screen name="My Courses" component={MyCoursesScreen} options={{
          headerStyle: {
            backgroundColor: '#FD841F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight : ((props) => {
            return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => {navigation.openDrawer()}} />
          }),
        }}/>
          <Stack.Screen name="My Course Detail" component={MyCourseDetail} options={({ route }) => ({
          title: route.params.title.toString(),
          headerStyle: {
            backgroundColor: '#FD841F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight : ((props) => {
            return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => {navigation.openDrawer()}} />
          }),
        })}/>
            <Stack.Screen name="Play a Course" component={PlayACourseScreen} options={{
          headerStyle: {
            backgroundColor: '#FD841F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight : ((props) => {
            return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => {navigation.openDrawer()}} />
          }),
        }}/>
        </Stack.Navigator>
    )
}
const Community = ({navigation}) => {
    return(
        <Stack.Navigator initialRouteName="Community">
            {/* เดะมาเปลี่ยนชื่อ detail กับ inner */}
            <Stack.Screen name="Community" component={CommunityScreen} options={{
              headerStyle: {
                backgroundColor: '#FD841F',
              },
              headerRight : ((props) => {
                return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => {navigation.openDrawer()}} />
              }),
              headerTintColor : "white"}} />
            <Stack.Screen name="Post Detail" component={PostDeatilScreen} options={{
              headerStyle: {
                backgroundColor: '#FD841F',
            },
            headerRight : ((props) => {
              return <Ionicons name="md-reorder-three-outline" size={30} color={'white'} onPress={() => {navigation.openDrawer()}} />
            }),
            headerTintColor : "white"}}/>
        </Stack.Navigator>
    )
}
const MainCoursesTab = () => {
    return(
        <Tab.Navigator initialRouteName="My Course">
            <Tab.Screen name="New Course Tab" component={NewCourse}
                options={{
                    title : "New Course",
                    tabBarIcon : ({color, size}) => {
                        return <Ionicons name="ios-add-outline" size={size} color={color} />
                    },
                    headerShown : false,
                }}/>
            <Tab.Screen name="Basic Course Tab" component={BasicCourses}
                options={{
                    title : "Basic Course",
                    tabBarIcon : ({color, size}) => {
                        return <Ionicons name="ios-barbell-outline" size={size} color={color} />
                    },
                    headerShown : false
                }}/>
            <Tab.Screen name="My Course Tab" component={MyCourses}
                options={{
                    title : "My Course",
                    tabBarIcon : ({color, size}) => {
                        return <Ionicons name="ios-home" size={size} color={color} />
                    },
                    headerShown : false
                }}/>
            {/* <Tab.Screen name="Calculator Tab" component={HealthCalculatorScreen}
                options={{
                    title : "Calculator",
                    tabBarIcon : ({color, size}) => {
                        return <Ionicons name="ios-calculator-outline" size={size} color={color} />
                    }
                }}/> */}
            <Tab.Screen name="Advanced Course Tab" component={AdvancedCourses}
                options={{
                    title : "Hard Course",
                    headerShown : false,
                    tabBarIcon : ({color, size}) => {
                        return <Ionicons name="ios-body-outline" size={size} color={color} />
                    }
                }}/>
            <Tab.Screen name="Community Tab" component={Community}
                options={{
                    title : "Community",
                    tabBarIcon : ({color, size}) => {
                        return <Ionicons name="ios-people-outline" size={size} color={color} />
                    },
                    headerShown : false
                }}/>
        </Tab.Navigator>
    )
}
const MainNavigation = () => {
    return(
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{headerShown : false}}>
                <Drawer.Screen name="Home" component={MainCoursesTab}/>
                <Drawer.Screen name="Login" component={LoginScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation;