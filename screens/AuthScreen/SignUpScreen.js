import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../database/firebase";
import { Ionicons } from "@expo/vector-icons";
export const SignUpScreen = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")

    const [signUpComplete, setSignUpComplete] = useState(false)

    const signUpAcc = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            updateProfile(user, {displayName})
            setSignUpComplete(true)
            setEmail(""), setPassword(""), setDisplayName("")
            // ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            console.log(error.message)
        });
    }
    return (
        <View style={{
            flex : 1,
            backgroundColor : '#69DFFF'
        }}>
            <View style={{marginLeft : 20, marginTop : 20}}>
                <Text style={{
                    fontSize : 48,
                    fontWeight : '600',
                    color : 'white'
                }}>Create An Account</Text>
            </View>
            <View style={{
                width : '100%',
                height : '80%',
                backgroundColor : 'white',
                borderRadius : 20,
                position : 'absolute',
                bottom : 0,
                padding : 20
            }}>
                {signUpComplete ?
                    <View style={{
                        width : '100%',
                        height : 50,
                        borderWidth : 1,
                        borderColor : 'green',
                        backgroundColor : '#CAFFC0',
                        alignItems : 'center',
                        paddingLeft : 20,
                        marginBottom : 20,
                        flexDirection : 'row'
                    }}>
                        <Text style={{color : 'black'}}>Your account have been created.</Text>
                        <TouchableOpacity style={{position : 'absolute', right : '5%'}} onPress={() => {setSignUpComplete(false)}}>
                            <Ionicons name="ios-close-outline" size={30} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
                <View>
                    <Text style={{marginBottom : 10, fontWeight : '600'}}>Display Name</Text>
                    <TextInput
                    placeholder="ex. แกะนิรนาม"
                    onChangeText={setDisplayName}
                    value={displayName}
                    style={{
                        width : '100%',
                        height : 50,
                        borderWidth : 1,
                        borderColor : 'lightgray',
                        paddingLeft : 10,
                        borderRadius : 5,
                    }}/>
                </View>

                <View style={{marginTop : 20}}>
                    <Text style={{marginBottom : 10, fontWeight : '600'}}>Email</Text>
                    <TextInput
                    placeholder="your.name@example.com"
                    onChangeText={setEmail}
                    value={email}
                    style={{
                        width : '100%',
                        height : 50,
                        borderWidth : 1,
                        borderColor : 'lightgray',
                        paddingLeft : 10,
                        borderRadius : 5
                    }}/>
                </View>

                <View style={{marginTop : 20}}>
                    <Text style={{marginBottom : 10, fontWeight : '600'}}>Password</Text>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                        <TextInput secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                        style={{
                            width : '100%',
                            height : 50,
                            borderWidth : 1,
                            borderColor : 'lightgray',
                            paddingLeft : 10,
                            borderRadius : 5
                        }}/>
                    </View>
                </View>
                {/* <View style={{marginTop : 20}}>
                    <Text style={{marginBottom : 10, fontWeight : '600'}}>Confirm Password</Text>
                    <TextInput secureTextEntry={true}
                    style={{
                        width : '100%',
                        height : 50,
                        borderWidth : 1,
                        borderColor : 'lightgray',
                        paddingLeft : 10,
                        borderRadius : 5
                    }}/>
                </View> */}

                <View style={{marginTop : 20}}>
                    <TouchableOpacity style={{
                        width : '100%',
                        height : 50,
                        backgroundColor : 'lightgreen',
                        borderRadius : 5,
                        justifyContent : 'center', 
                        alignItems : 'center'
                    }}
                    onPress={() => {signUpAcc()}}>
                        <Text style={{fontWeight : '500', fontSize : 18, color : 'white'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}