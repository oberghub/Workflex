import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../database/firebase";
export const LoginScreen = ({navigation}) => {
    const [incorrect, setIncorrect] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signInAcc = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          setEmail(""), setPassword("")
          navigation.navigate("Home")
          // ...
        })
        .catch((error) => {
          //const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
          setIncorrect(true)
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
                }}>Sign In Account</Text>
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
                {incorrect ? 
                    <View style={{
                        width : '100%',
                        height : 50,
                        borderWidth : 1,
                        borderColor : 'red',
                        backgroundColor : '#FFC0C0',
                        alignItems : 'center',
                        paddingLeft : 20,
                        marginBottom : 20,
                        flexDirection : 'row'
                    }}>
                        <Text style={{color : 'black'}}>Your username or password is incorrect.</Text>
                        <TouchableOpacity style={{position : 'absolute', right : '5%'}} onPress={() => {setIncorrect(false)}}>
                            <Ionicons name="ios-close-outline" size={30} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
                <View>
                    <Text style={{marginBottom : 10, fontWeight : '600'}}>Email</Text>
                    <TextInput
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
                    }}>
                    </TextInput>
                </View>

                <View style={{marginTop : 20}}>
                    <TouchableOpacity style={{
                        width : '100%',
                        height : 50,
                        backgroundColor : 'lightgreen',
                        borderRadius : 5,
                        justifyContent : 'center', 
                        alignItems : 'center'
                    }} onPress={() => {signInAcc()}}>
                        <Text style={{fontWeight : '500', fontSize : 18, color : 'white'}}>Login</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection : 'row', marginTop : 10, width : '100%', justifyContent : 'center'}}>
                    <Text style={{color : '#757575', fontWeight : '600'}}>If you haven't already an account ? </Text>
                    <TouchableOpacity style={{borderBottomWidth : 1, borderBottomColor : 'blue'}} onPress={() => {navigation.navigate("SignUp")}}>
                        <Text style={{color : 'blue',fontWeight : '600'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}