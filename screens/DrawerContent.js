import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useState, useEffect } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../database/firebase";
import { TextInput } from "react-native-gesture-handler";
//Store data to firebase
export const DrawerContent = (props) => {
    const [account, setAccount] = useState(false)
    const [userData, setUserData] = useState("")
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bmi, setBmi] = useState()
    const [txtResult, setTxtResult] = useState("")

    const signOutAcc = () => {
        signOut(auth)
            .then(() => {
                setAccount(true)
                props.navigation.navigate("Login")
            })
            .catch((err) => {
                console.log(err.message)
                setAccount(false)
            })
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // console.log(user)
            setUserData(user)
            setAccount(true)
        }
        else {
            // console.log("when logout user value = " +user)
            setAccount(false)
        }
    })
    const bmiCal = () => {
        // setFilter(false)
        setBmi(parseFloat(weight / (height / 100) ** 2).toFixed(2));
        let result = parseFloat(weight / (height / 100) ** 2).toFixed(2);
        if (result < 18.5) {
            setTxtResult("Underweight");
        } else if (result >= 18.5 && result < 25) {
            setTxtResult("Normal weight");
        } else if (result >= 25 && result < 30) {
            setTxtResult("Over weight");
        } else if (result >= 30) {
            setTxtResult("Obese");
        } else {
            alert("ใส่ค่าไม่ถูกต้อง!");
            setTxtResult("กรุณาใส่ค่าใหม่");
        }

    }
    return (
        <View style={{
            flex: 1,
            paddingTop: 30,
        }}>
            {!account ?
                <View style={{ paddingLeft: 20, marginTop: 20 }}>
                    <View>
                        <TouchableOpacity onPress={() => { props.navigation.navigate("Login") }} style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <Ionicons name="ios-log-in-outline" size={25} color={'#444444'} style={{ marginTop: -2, marginRight: 10, marginLeft: -5 }} />
                            <Text style={{ fontWeight: '600' }}>เข้าสู่ระบบ</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => { props.navigation.navigate("SignUp") }} style={{ flexDirection: 'row' }}>
                            <Ionicons name="ios-person-add-outline" size={20} color={'#444444'} style={{ marginTop: -2, marginRight: 10, marginLeft: -1 }} />
                            <Text style={{ fontWeight: '600' }}>ลงทะเบียน</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                //if had a account
                <View>
                    <View style={{ width: "100%", paddingLeft: 30, paddingTop: 20, marginBottom: 20 }}>
                        <Text style={{ fontSize: 40, fontWeight: '600' }}>โปรไฟล์</Text>

                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#464646', marginTop: 10 }}>@{userData.displayName}</Text>
                        </View>
                        {/* <View style={{flexDirection : 'row'}}>
                        <Text style={{fontSize : 16, fontWeight : '500', color : '#717171', marginTop :15}}>H : {account.height} cm</Text>
                        <Text style={{fontSize : 16, fontWeight : '500', color : '#717171', marginTop :15, marginLeft : 15}}>W : {account.weight} kg</Text>
                    </View>
                    <Text style={{fontSize : 16, fontWeight : '500', color : '#717171', marginTop :15}}>BMI : {(account.weight / (Math.pow(account.height/100, 2))).toFixed(2)}</Text> */}
                    </View>
                    {/* Line */}
                    <View style={{
                        width: '100%', borderBottomWidth: 1,
                        borderBottomColor: 'lightgray'
                    }} />


                    <View style={{ width: "100%", paddingLeft: 30, paddingTop: 20 }}>
                        <View>
                            <TouchableOpacity onPress={() => { props.navigation.navigate("Home") }}
                                style={{ marginBottom: 20, flexDirection: 'row' }}>
                                <Ionicons name="ios-home-outline" size={20} color={'#444444'} style={{ marginTop: -2, marginRight: 10 }} />
                                <Text style={{ fontWeight: '600' }}>หน้าหลัก</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Line */}
                    <View style={{
                        width: '100%', borderBottomWidth: 1,
                        borderBottomColor: 'lightgray'
                    }} />


                    <View style={{ width: '100%', paddingLeft: 30, paddingTop: 20 }}>
                        <TouchableOpacity onPress={() => { signOutAcc() }} style={{ flexDirection: 'row' }}>
                            <Ionicons name="ios-exit-outline" size={23} color={'#444444'} style={{ marginTop: -2, marginRight: 10 }} />
                            <Text style={{ fontWeight: '600' }}>ออกจากระบบ</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Line */}
                    <View style={{
                        width: '100%', borderBottomWidth: 1,
                        borderBottomColor: 'lightgray', marginTop: 20
                    }} />
                    <View style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 30 }}>
                        <View style={{ width: '40%', marginRight: 10 }}>
                            <Text style={{ marginBottom: 5 }}>ส่วนสูง</Text>
                            <TextInput style={{
                                width: '100%',
                                height: 40,
                                borderWidth: 1,
                                borderColor: 'lightgray',
                                borderRadius: 5, padding: 5
                            }}
                                placeholder="ส่วนสูง"
                                keyboardType='numeric'
                                onChangeText={setHeight}
                                value={height}
                            />
                        </View>
                        <View style={{ width: '40%' }}>
                            <Text style={{ marginBottom: 5 }}>น้ำหนัก</Text>
                            <TextInput style={{
                                width: '100%',
                                height: 40,
                                borderWidth: 1,
                                borderColor: 'lightgray',
                                borderRadius: 5, padding: 5
                            }}
                                placeholder="น้ำหนัก"
                                keyboardType='numeric'
                                onChangeText={setWeight}
                                value={weight}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems:"center"}}>
                        <TouchableOpacity style={{
                            width: '40%', height: 40, backgroundColor: 'lightblue',
                            borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 10
                        }} onPress={() => { bmiCal() }}>
                            <Text style={{ color: 'white' }}>คํานวณ</Text>
                        </TouchableOpacity>
                    <View style={{alignItems:"center"}}>
                        <Text style={{fontSize:50}}>{bmi}</Text>
                        <Text style={{fontSize:30}}>{txtResult}</Text>
                    </View>
                    </View>
                </View>
            }
        </View >
    )
}