import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useState, useEffect } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../database/firebase";
import { TextInput } from "react-native-gesture-handler";
import { SelectList } from 'react-native-dropdown-select-list'
import { RadioButton } from 'react-native-paper';
//Store data to firebase
export const DrawerContent = (props) => {
    const [account, setAccount] = useState(false)
    const [userData, setUserData] = useState("")
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [bmi, setBmi] = useState(null)
    const [bmr, setbmr] = useState(0)
    const [TDEE, setTDEE] = useState(0)
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("ชาย")
    const [selected, setSelected] = useState("")

    const data = [
        { key: '1', value: 'ไม่ได้ออกกำลังกายเลย' },
        { key: '2', value: '1-3 วันต่อสัปดาห์' },
        { key: '3', value: '3-5 วันต่อสัปดาห์' },
        { key: '4', value: '6-7 วันต่อสัปดาห์' },
        { key: '5', value: 'เป็นประจำ เพื่อแข่งขัน' },
    ]

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

    const calTDEE = (bmr) => {
        if (selected == 'ไม่ได้ออกกำลังกายเลย') {
            setTDEE((parseFloat(bmr * 1.2)).toFixed(2));
        }
        else if (selected == '1-3 วันต่อสัปดาห์') {
            setTDEE((parseFloat(bmr * 1.375)).toFixed(2));
        }
        else if (selected == '3-5 วันต่อสัปดาห์') {
            setTDEE((parseFloat(bmr * 1.55)).toFixed(2));
        }
        else if (selected == '6-7 วันต่อสัปดาห์') {
            setTDEE((parseFloat(bmr * 1.7)).toFixed(2));
        }
        else if (selected == 'เป็นประจำ เพื่อแข่งขัน') {
            setTDEE((parseFloat(bmr * 1.9)).toFixed(2));
        }
    }
    const bmiCal = () => {
        // setFilter(false)
        setBmi(parseFloat(weight / (height / 100) ** 2).toFixed(2));
        if (gender == "ชาย") {
            setbmr(parseFloat(66 + (13.7 * weight) + (5 * height) - (6.8 * age)).toFixed(2));
            calTDEE(parseFloat(66 + (13.7 * weight) + (5 * height) - (6.8 * age)).toFixed(2));
        }
        else if(gender == "หญิง"){
            setbmr(parseFloat(665 + (9.6 * weight) + (1.8 * height) - (4.7 * age)).toFixed(2));
            calTDEE(parseFloat(665 + (9.6 * weight) + (1.8 * height) - (4.7 * age)).toFixed(2));
        }
        //let result = parseFloat(weight / (height / 100) ** 2).toFixed(2);
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

                    <View style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 20 }}>
                        <RadioButton
                            value="ชาย"
                            status={gender === 'ชาย' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setGender('ชาย')
                            }}
                        /><Text style={{fontSize: 22}}>เพศชาย</Text>
                        <RadioButton
                            value="หญิง"
                            status={gender === 'หญิง' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setGender('หญิง')
                            }}
                        /><Text style={{fontSize: 22}}>เพศหญิง</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, paddingLeft: 20 }}>
                        <SelectList
                            setSelected={(val) => {
                                setSelected(val)
                            }}
                            data={data}
                            save="value"
                            placeholder="ออกกำลังกายบ่อยแค่ไหน"
                        />
                    </View>

                    <View style={{ width: '40%', marginRight: 10, marginTop: 10, paddingLeft: 30 }}>
                        <Text style={{ marginBottom: 5 }}>อายุ</Text>
                        <TextInput style={{
                            width: '100%',
                            height: 40,
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            borderRadius: 5, padding: 5
                        }}
                            placeholder="อายุ"
                            keyboardType='numeric'
                            onChangeText={setAge}
                            value={age}
                        />
                    </View>
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
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity style={{
                            width: '40%', height: 40, backgroundColor: 'lightblue',
                            borderRadius: 5, alignItems: 'center', justifyContent: 'center', marginTop: 10
                        }} onPress={() => { bmiCal() }}>
                            <Text style={{ color: 'white' }}>คํานวณ</Text>
                        </TouchableOpacity>
                        {!bmi ?
                            null
                            :
                            <View style={{
                                alignItems: "center", justifyContent: 'center',
                                width: '75%', height: 80, borderRadius: 5,
                                borderWidth: 1, borderColor: 'lightgray', marginTop: 10
                            }}>
                                <Text style={{ fontSize: 16 }}>ค่า BMI ของคุณคือ {bmi}</Text>
                                <Text style={{ fontSize: 16 }}>BMR ของคุณคือ {bmr} kcal</Text>
                                <Text style={{ fontSize: 16 }}>พลังงานที่ต้องใช้ {TDEE} kcal</Text>
                            </View>
                        }
                    </View>
                </View>
            }
        </View >
    )
}