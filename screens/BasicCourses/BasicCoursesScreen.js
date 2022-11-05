import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { CATEGORIES as data } from "../../data/dummy-data";
import { Ionicons } from '@expo/vector-icons';
const BasicCoursesScreen = ({navigation})  => {
  return (
    <View style={styles.container}>

      <View style={[styles.shadowbox, {width : "100%", padding : 10}]}>

        <FlatList data={data} renderItem={({item, index}) => 
            <View style={{height : 290, 
                          width : '100%',
                          borderWidth : 1, 
                          borderColor : 'lightgray', 
                          borderRadius : 10,
                          marginBottom : 15,
                          backgroundColor : '#fff'}}>      
              <View style={styles.gridItem}>
                <Image source={{ uri: item.image }} style={styles.bgImage}/>
                <Text style={styles.txtImg}>{item.title}</Text>
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
    height: 250,
    marginTop : -5,
    borderRadius : 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
  },
});

export default BasicCoursesScreen;

