import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from "@expo/vector-icons";

//Basic Course
import BasicCoursesScreen from "../screens/BasicCourses/BasicCoursesScreen";
import CourseDetailScreen from "../screens/BasicCourses/CourseDetailScreen";
import InnerCourseScreen from "../screens/BasicCourses/InnerCourseScreen";

//My Course
import MyCoursesScreen from "../screens/MyCourses/MyCoursesScreen";
import EditMyCourseScreen from "../screens/MyCourses/EditMyCourseScreen";
import PlayACourseScreen from "../screens/MyCourses/PlayACourseScreen";

import HealthCalculatorScreen from "../screens/Calculate/HealthCalcutarorScreen";

//New Course
import NewCourseScreen from "../screens/NewCourse/NewCourseScreen";
import SetDetailExerciseScreen from "../screens/NewCourse/SetDetailExerciseScreen";

//Community
import CommunityScreen from "../screens/Community/CommunityScreen";
import PostDeatilScreen from "../screens/Community/PostDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const NewCourse = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="New Course" component={NewCourseScreen}/>
            <Stack.Screen name="Set Exercise Detail" component={SetDetailExerciseScreen}/>
        </Stack.Navigator>
    )
}
const BasicCourses = () => {
    return(
        <Stack.Navigator initialRouteName="Basic Course">
            {/* เดะมาเปลี่ยนชื่อ detail กับ inner */}
            <Stack.Screen name="Basic Course" component={BasicCoursesScreen} />
            <Stack.Screen name="Course Detail" component={CourseDetailScreen} />
            <Stack.Screen name="Inner Course" component={InnerCourseScreen} />
        </Stack.Navigator>
    )
}
const MyCourses = () => {
    return(
        <Stack.Navigator initialRouteName="My Courses">
            {/* เดะมาเปลี่ยนชื่อ detail กับ inner */}
            <Stack.Screen name="My Courses" component={BasicCoursesScreen} />
            <Stack.Screen name="Play a Course" component={PlayACourseScreen} />
            <Stack.Screen name="Edit Course" component={EditMyCourseScreen} />
        </Stack.Navigator>
    )
}
const Community = () => {
    return(
        <Stack.Navigator initialRouteName="Community">
            {/* เดะมาเปลี่ยนชื่อ detail กับ inner */}
            <Stack.Screen name="Community" component={CommunityScreen} />
            <Stack.Screen name="Post Detail" component={PostDeatilScreen} />
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
                    headerShown : false
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
            <Tab.Screen name="Calculator Tab" component={HealthCalculatorScreen}
                options={{
                    title : "Calculator",
                    tabBarIcon : ({color, size}) => {
                        return <Ionicons name="ios-calculator-outline" size={size} color={color} />
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
            <MainCoursesTab/>
        </NavigationContainer>
    )
}

export default MainNavigation;