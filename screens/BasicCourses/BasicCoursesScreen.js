import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { CATEGORIES as data } from "../../data/dummy-data";
import { Ionicons } from '@expo/vector-icons';
const BasicCoursesScreen = ({navigation})  => {
  return (
    <View style={styles.container}>

      <View style={[styles.shadowbox, {width : "100%", padding : 10}]}>

        <FlatList data={data} renderItem={({item, index}) => 
            <View style={{height : 320, 
                          width : '100%',
                          borderWidth : 1, 
                          borderColor : 'lightgray', 
                          borderRadius : 5,
                          marginBottom : 15,
                          backgroundColor : '#F2F2F2'}}>      
              <View style={styles.gridItem}>
                <Image source={{ uri: item.image }} style={styles.bgImage}/>
                {/* <Text style={styles.txtImg}>{item.title}</Text> */}
              </View>

              <View style={{position : 'absolute', width : '95%', top : 160, paddingTop : 10, paddingRight : 10, paddingLeft : 10}}>

                <Text style={{marginLeft : 10}}>
                  <Text style={{fontWeight : '700'}}>Course</Text> : {item.title}
                </Text>

                <Text style={{marginLeft : 10, marginTop : 10}}>
                  <Text style={{fontWeight : '700'}}>Detail</Text> : Lorem ipsum dolor sit amet, putent quaestio quaerendum ea mei. Nulla legimus nonumes ei pro, 
                  et stet falli tacimates eos, eu usu omnis mundi prodesset.
                </Text>

              </View>

              <TouchableOpacity style={{width : '100%', 
                                        height : 40, 
                                        backgroundColor : 'lightblue',
                                        alignItems : 'center',
                                        justifyContent : 'center',
                                        borderRadius : 5}}
                onPress={() => {
                  navigation.navigate("Course Detail", {categoryTitle : item.title})
                }}>
                  <Ionicons name='ios-exit-outline' size={20} color={'black'}/>
              </TouchableOpacity>
          </View>
        } />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : '#fff'
  },
  gridItem: {
    flex: 1,
    marginBottom: 10,
    paddingTop:5,
    height: 170,
  },
  txtImg:{
        flex: 1,
        //fontFamily: 'Kanit_400Regular', //เอาไว้ค่อย import มาใหม่
        left : 20,
        top : 10,
        justifyContent: "center",
        alignSelf: "center",
        fontSize:32,
        fontWeight : '700',
        color:"#000",
        position : 'absolute',
        // textShadowColor:'#585858',
        // textShadowOffset:{width: 5, height: 5},
        // textShadowRadius:10,
    },
  shadowbox: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 20,
    justifyContent: "flex-end",
  },
  bgImage: {
    width: "100%",
    height: 150,
    marginTop : -5,
    borderRadius : 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
  },
});

export default BasicCoursesScreen;

