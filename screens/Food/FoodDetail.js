import React, { useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
export const FoodDetail = ({route, navigation}) => {
    const {foodData, Kcal} = route.params
    const [ingradient, setIngradient] = useState(foodData.ingradient)
    const abc = () => {
        console.log(ingradient)
    }
    return(
        <View style={{
            flex : 1,
            alignItems : 'center',
            padding : 10
        }}
        >
            <View style={{
                width : '100%'
            }}>
                <Image
                    style={{width : '100%', height : 200, borderRadius : 10}}
                    source={{uri: foodData.image}}
                />
            </View>
            <ScrollView>
                <View style={{
                    width : '100%',
                    height : 'auto',
                    backgroundColor : 'white',
                    shadowColor: '#171717',
                    shadowOffset: {width: -2, height: 4},
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    borderRadius : 10,
                    marginTop : 15,
                    padding : 15
                }}>
                    <Text style={{fontSize : 24, fontWeight : '700'}}>{foodData.foodTitle} <Text style={{fontSize : 14, fontWeight : '300'}}>{Kcal} Kcal</Text> </Text>
                    <Text style={{fontSize : 14, fontWeight : '300', marginTop : 10}}>• {foodData.desc}</Text>
                    <Text style={{fontSize : 16, fontWeight : '400', marginTop : 10}}>วัตถุดิบ</Text>
                    {ingradient.map((item, index) => {
                    return( 
                        <Text key={index} style={{fontSize : 14, fontWeight : '300'}}>- {item.ingradientName} {item.weight}g</Text>
                    )
                    })}
                    <Text style={{fontSize : 16, fontWeight : '400', marginTop : 10}}>วิธีทำ</Text>
                    <Text style={{fontSize : 14, fontWeight : '300'}}>• {foodData.howTo}</Text>
                </View>
            </ScrollView>
        </View>
    )
}