import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../database/firebase";
export const DrawerContent = (props) => {
    const [account, setAccount] = useState(false)
    const [userData, setUserData] = useState("")
    const signOutAcc = () => {
        signOut(auth)
        .then(() => {
            // console.log("sign out")
            setAccount(true)
            props.navigation.navigate("Login")
        })
        .catch((err) => {
            console.log(err.message)
            setAccount(false)
        })
    }
    onAuthStateChanged(auth, (user) => {
        if(user){
            // console.log(user)
            setUserData(user)
            setAccount(true)
        }
        else{
            // console.log("when logout user value = " +user)
            setAccount(false)
        }
    })
    return (
        <View style={{
            flex : 1,
            paddingTop : 30,
        }}>
            {!account ?
            <View style={{paddingLeft : 20, marginTop : 20}}>
                <View> 
                    <TouchableOpacity onPress={() => {props.navigation.navigate("Login")}} style={{flexDirection : 'row', marginBottom :20}}>
                        <Ionicons name="ios-log-in-outline" size={25} color={'#444444'} style={{marginTop : -2, marginRight : 10, marginLeft : -5}}/>
                        <Text style={{fontWeight : '600'}}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={() => {props.navigation.navigate("SignUp")}} style={{flexDirection : 'row'}}>
                        <Ionicons name="ios-person-add-outline" size={20} color={'#444444'} style={{marginTop : -2, marginRight : 10, marginLeft : -1}}/>
                        <Text style={{fontWeight : '600'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            : 
            //if had a account
            <View>
                <View style={{width : "100%", paddingLeft : 30, paddingTop : 20, marginBottom : 20}}>
                    <Text style={{fontSize : 40, fontWeight : '600'}}>Profile</Text>
                    <Text style={{fontSize : 18, fontWeight : '700', color : '#464646', marginTop :10}}>@{userData.displayName}</Text>
                    {/* <View style={{flexDirection : 'row'}}>
                        <Text style={{fontSize : 16, fontWeight : '500', color : '#717171', marginTop :15}}>H : {account.height} cm</Text>
                        <Text style={{fontSize : 16, fontWeight : '500', color : '#717171', marginTop :15, marginLeft : 15}}>W : {account.weight} kg</Text>
                    </View>
                    <Text style={{fontSize : 16, fontWeight : '500', color : '#717171', marginTop :15}}>BMI : {(account.weight / (Math.pow(account.height/100, 2))).toFixed(2)}</Text> */}
                </View>
                {/* Line */}
                <View style={{width : '100%', borderBottomWidth : 1,
                        borderBottomColor : 'lightgray'}} />


                <View style={{width : "100%", paddingLeft : 30, paddingTop : 20}}>
                    <View> 
                        <TouchableOpacity onPress={() => {props.navigation.navigate("Home")}} 
                            style={{marginBottom : 20, flexDirection : 'row'}}>
                            <Ionicons name="ios-home-outline" size={20} color={'#444444'} style={{marginTop : -2, marginRight : 10}}/>
                            <Text style={{fontWeight : '600'}}>Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Line */}
                <View style={{width : '100%', borderBottomWidth : 1,
                        borderBottomColor : 'lightgray'}} />


                <View style={{width : '100%', paddingLeft : 30, paddingTop : 20}}>
                    <TouchableOpacity onPress={() => {signOutAcc()}} style={{flexDirection : 'row'}}>
                        <Ionicons name="ios-exit-outline" size={23} color={'#444444'} style={{marginTop : -2, marginRight : 10}}/>
                        <Text style={{fontWeight : '600'}}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

                {/* Line */}
                <View style={{width : '100%', borderBottomWidth : 1,
                            borderBottomColor : 'lightgray', marginTop : 20}} />
                </View>
            }
        </View>
    )
}