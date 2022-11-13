import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const BasicCoursesScreen = ({navigation})  => {
  const courseData = [
    {
      id : 'c1',
      title : "พื้นฐานวัยเด็ก เสริมสร้างภูมิคุ้มกัน",
      image : "https://www.prachachat.net/wp-content/uploads/2019/07/dlf06110762p1-728x515.jpg",
      postureData : [
        {id : 'p1', pTitle : 'หมุนเอว', timeDuration : 30},
        {id : 'p2', pTitle : 'แทงปลาไหล', timeDuration : 30},
        {id : 'p3', pTitle : 'ก้มแตะสลับ', timeDuration : 30},
        {id : 'p4', pTitle : 'กระโดดตบ', timeDuration : 30},
        {id : 'p5', pTitle : 'สก็อตจัมพ์', timeDuration : 30},
      ],
      desc:"คอร์สออกกำลังกายแบบเบาๆ ง่ายๆ และเน้นความสนุกสนานไปด้วยจะทำให้การออกกำลังกายมีประสิทธิภาพที่ดีขึ้น สำหรับเด็ก"
    },
    {
      id : 'c2',
      title : "วัยรุ่นวัยทีน หุ่นลีนง่ายๆ",
      image : "https://yourteenmag.com/wp-content/uploads/2018/09/teenagers-hanging-with-friends-1135x540.jpg",
      postureData : [
        {id : 'p1', pTitle : 'Jumping Jack', timeDuration : 30},
        {id : 'p2', pTitle : 'frozen V-sit', timeDuration : 20},
        {id : 'p3', pTitle : 'Incline Push-up', timeDuration : 20},
        {id : 'p4', pTitle : 'Plank', timeDuration : 20},
        {id : 'p5', pTitle : 'Step Up With Knee Raise', timeDuration : 25},
        {id : 'p6', pTitle : 'cobra stretch', timeDuration : 20},
        {id : 'p7', pTitle : 'spine lumbar twist stretch left', timeDuration : 30},
        {id : 'p8', pTitle : 'spine lumbar twist stretch right', timeDuration : 30},
      ],
      desc:"คอร์สออกกำลังกายแบบชิลๆ เน้นสร้างกล้ามเนื้อ ช่วยให้ร่างกายแข็งแรง หุ่นดี ไม่อ้วน สำหรับวัยรุ่น ออกหลังเลิกเรียนแล้วผักผ่อนเยอะๆ"
    },
    {
      id : 'c3',
      title : "อย่าลืมรักษาสุขภาพก่อนแก่นะ",
      image : "https://www.theorthodontists.com.au/theme/theorthodontistscomau/assets/public/Image/header-images/adults.png",
      postureData : [
        {id : 'p1', pTitle : 'Jumping Jack', timeDuration : 30},
        {id : 'p2', pTitle : 'Plank', timeDuration : 20},
        {id : 'p3', pTitle : 'Shoulder Taps', timeDuration : 20},
        {id : 'p4', pTitle : 'Superman', timeDuration : 20},
        {id : 'p5', pTitle : 'ปั่นจักรยานอากาศ', timeDuration : 25},
        {id : 'p6', pTitle : 'Sit Up', timeDuration : 20},
        {id : 'p7', pTitle : 'Mountain Climber', timeDuration : 30},
        {id : 'p8', pTitle : 'Squat', timeDuration : 30},
        {id : 'p9', pTitle : 'วิ่งอยู่กับที่ ขาแตะก้น', timeDuration : 30},
        {id : 'p10', pTitle : 'cobra stretch', timeDuration : 30},
        {id : 'p11', pTitle : 'spine lumbar twist stretch left', timeDuration : 30},
        {id : 'p12', pTitle : 'spine lumbar twist stretch right', timeDuration : 30},
      ],
      desc:"คอร์สออกกำลังกายที่เน้นไปที่ความต่อเนื่อง ใช้พลังงานมาก เพื่อสร้างความแข็งแรงและความอดทน สำหรับวัยทำงาน"
    },
    {
      id : 'c4',
      title : "ออกกำลังกายเบาๆกับสังคมวัยสูงอายุ",
      image : "https://samitivej-prod-new-website.s3.ap-southeast-1.amazonaws.com/public/uploads/descriptions/13431a01e8289a6b89ce828e28dfad00.jpg",
      postureData : [
        {id : 'p1', pTitle : 'ย่ำเท้าอยู่กับที่', timeDuration : 60},
        {id : 'p2', pTitle : 'กระโดดตบเบาๆ', timeDuration : 30},
        {id : 'p3', pTitle : 'โบกมือเหนือหัว', timeDuration : 15},
        {id : 'p4', pTitle : 'กางศอก หุบศอก', timeDuration : 15},
        {id : 'p5', pTitle : 'ท้าวเอว หมุนไหล่', timeDuration : 20},
        {id : 'p6', pTitle : 'บิดเอวซ้าย ขวา', timeDuration : 40},
        {id : 'p7', pTitle : 'แกว่งแขน', timeDuration : 60},
      ],
      desc:"คอร์สออกกำลังกายเพื่อสุขภาพ เน้นขยับร่างกายช้าๆเบาๆ ใช้พลังงานน้อย เหมาะกับผู้สูงอายุ ออกตอนเช้าก็ได้ ออกตอนเย็นก็ดี"
    }
  ]
  const formatTime = (time) => {
    return Math.floor(time/60) + " Min " + time%60 +  " Sec"
  }
  return (
    <View style={styles.container}>

      <View style={[styles.shadowbox, {width : "100%", padding : 10}]}>

        <FlatList data={courseData} renderItem={({item, index}) => 
            <View style={{height : 370, 
                          width : '100%',
                          borderWidth : 1, 
                          borderColor : 'lightgray', 
                          borderRadius : 5,
                          marginBottom : 15,
                          backgroundColor : '#F2F2F2'}}>      
              <View style={[styles.gridItem]}>
                <Image source={{ uri: item.image }} style={[styles.bgImage]}/>
                {/* <Text style={styles.txtImg}>{item.title}</Text> */}
              </View>

              <View style={{position : 'absolute', width : '95%', top : 160, paddingTop : 10, paddingRight : 10, paddingLeft : 10}}>

                <Text style={{marginLeft : 10}}>
                  <Text style={{fontWeight : '700'}}>Course</Text> : {item.title}
                </Text>

                <Text style={{marginLeft : 10, marginTop : 10}}>
                  <Text style={{fontWeight : '700'}}>Detail</Text> : {item.desc}
                </Text>

                <Text style={{marginLeft : 10, marginTop : 10}}>
                  <Text style={{fontWeight : '700'}}>Posture</Text> : {item.postureData.length}
                </Text>
                <Text style={{marginLeft : 10, marginTop : 10}}>
                  <Text style={{fontWeight : '700'}}>Time Duration</Text> : {formatTime(item.postureData.map(data => data.timeDuration).reduce((prev, curr) => prev + curr))}
                </Text>

              </View>

              <TouchableOpacity style={{width : '100%', 
                                        height : 40, 
                                        backgroundColor : 'lightblue',
                                        alignItems : 'center',
                                        justifyContent : 'center',
                                        borderRadius : 5}}
                onPress={() => {
                  navigation.navigate("Course Detail", {categoryTitle : item.title, postureData : item.postureData})
                }}>
                  <Ionicons name='ios-enter-outline' size={20} color={'black'}/>
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

