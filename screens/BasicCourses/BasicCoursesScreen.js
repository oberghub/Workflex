import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const BasicCoursesScreen = ({navigation})  => {
  const courseData = [
    {
      id : 'c1',
      title : "พื้นฐานวัยเด็ก เสริมสร้างภูมิคุ้มกัน",
      image : "https://www.prachachat.net/wp-content/uploads/2019/07/dlf06110762p1-728x515.jpg",
      postureData : [
        {id : 'p1', postureName : 'หมุนเอว', timeDuration : 30},
        {id : 'p2', postureName : 'แทงปลาไหล', timeDuration : 30},
        {id : 'p3', postureName : 'ก้มแตะสลับ', timeDuration : 30},
        {id : 'p4', postureName : 'กระโดดตบ', timeDuration : 30},
        {id : 'p5', postureName : 'สก็อตจัมพ์', timeDuration : 30},
      ],
      desc:"คอร์สออกกำลังกายแบบเบาๆ ง่ายๆ และเน้นความสนุกสนานไปด้วยจะทำให้การออกกำลังกายมีประสิทธิภาพที่ดีขึ้น สำหรับเด็ก"
    },
    {
      id : 'c2',
      title : "วัยรุ่นวัยทีน หุ่นลีนง่ายๆ",
      image : "https://yourteenmag.com/wp-content/uploads/2018/09/teenagers-hanging-with-friends-1135x540.jpg",
      postureData : [
        {id : 'p1', postureName : 'Jumping Jack', timeDuration : 30},
        {id : 'p2', postureName : 'frozen V-sit', timeDuration : 20},
        {id : 'p3', postureName : 'Incline Push-up', timeDuration : 20},
        {id : 'p4', postureName : 'Plank', timeDuration : 20},
        {id : 'p5', postureName : 'Step Up With Knee Raise', timeDuration : 25},
        {id : 'p6', postureName : 'cobra stretch', timeDuration : 20},
        {id : 'p7', postureName : 'spine lumbar twist stretch left', timeDuration : 30},
        {id : 'p8', postureName : 'spine lumbar twist stretch right', timeDuration : 30},
      ],
      desc:"คอร์สออกกำลังกายแบบชิลๆ เน้นสร้างกล้ามเนื้อ ช่วยให้ร่างกายแข็งแรง หุ่นดี ไม่อ้วน สำหรับวัยรุ่น ออกหลังเลิกเรียนแล้วผักผ่อนเยอะๆ"
    },
    {
      id : 'c3',
      title : "อย่าลืมรักษาสุขภาพก่อนแก่นะ",
      image : "https://www.theorthodontists.com.au/theme/theorthodontistscomau/assets/public/Image/header-images/adults.png",
      postureData : [
        {id : 'p1', postureName : 'Jumping Jack', timeDuration : 30},
        {id : 'p2', postureName : 'Plank', timeDuration : 20},
        {id : 'p3', postureName : 'Shoulder Taps', timeDuration : 20},
        {id : 'p4', postureName : 'Superman', timeDuration : 20},
        {id : 'p5', postureName : 'ปั่นจักรยานอากาศ', timeDuration : 25},
        {id : 'p6', postureName : 'Sit Up', timeDuration : 20},
        {id : 'p7', postureName : 'Mountain Climber', timeDuration : 30},
        {id : 'p8', postureName : 'Squat', timeDuration : 30},
        {id : 'p9', postureName : 'วิ่งอยู่กับที่ ขาแตะก้น', timeDuration : 30},
        {id : 'p10', postureName : 'cobra stretch', timeDuration : 30},
        {id : 'p11', postureName : 'spine lumbar twist stretch left', timeDuration : 30},
        {id : 'p12', postureName : 'spine lumbar twist stretch right', timeDuration : 30},
      ],
      desc:"คอร์สออกกำลังกายที่เน้นไปที่ความต่อเนื่อง ใช้พลังงานมาก เพื่อสร้างความแข็งแรงและความอดทน สำหรับวัยทำงาน"
    },
    {
      id : 'c4',
      title : "ออกกำลังกายเบาๆกับสังคมวัยสูงอายุ",
      image : "https://samitivej-prod-new-website.s3.ap-southeast-1.amazonaws.com/public/uploads/descriptions/13431a01e8289a6b89ce828e28dfad00.jpg",
      postureData : [
        {id : 'p1', postureName : 'ย่ำเท้าอยู่กับที่', timeDuration : 60},
        {id : 'p2', postureName : 'กระโดดตบเบาๆ', timeDuration : 30},
        {id : 'p3', postureName : 'โบกมือเหนือหัว', timeDuration : 15},
        {id : 'p4', postureName : 'กางศอก หุบศอก', timeDuration : 15},
        {id : 'p5', postureName : 'ท้าวเอว หมุนไหล่', timeDuration : 20},
        {id : 'p6', postureName : 'บิดเอวซ้าย ขวา', timeDuration : 40},
        {id : 'p7', postureName : 'แกว่งแขน', timeDuration : 60},
      ],
      desc:"คอร์สออกกำลังกายเพื่อสุขภาพ เน้นขยับร่างกายช้าๆเบาๆ ใช้พลังงานน้อย เหมาะกับผู้สูงอายุ ออกตอนเช้าก็ได้ ออกตอนเย็นก็ดี"
    },
    {
      id : 'c5',
      title : "เปลี่ยน One Pack เป็น Six Pack!",
      image : "https://static.india.com/wp-content/uploads/2017/01/six-packs.jpg?impolicy=Medium_Resize&w=1200&h=800",
      desc : "คอร์สออกกำลังกายสำหรับการสร้างกล้ามเนื้อหน้าท้อง เพื่อเสริมสร้างความแข็งแรงของกล้ามเนื้อหน้าท้อง",
      postureData : [
        {id : 'p1', postureName : 'Jumping Jack', timeDuration : 30},
        {id : 'p2', postureName : 'Russian Twist', timeDuration : 30},
        {id : 'p3', postureName : 'Mountain Climber', timeDuration : 30},
        {id : 'p4', postureName : 'Heel Touch', timeDuration : 30},
        {id : 'p5', postureName : 'Leg Raises', timeDuration : 30},
        {id : 'p6', postureName : 'Plank', timeDuration : 30},
        {id : 'p7', postureName : 'Abdominal Crunches', timeDuration : 30},
        {id : 'p8', postureName : 'Heel Touch', timeDuration : 30},
        {id : 'p9', postureName : 'Leg Raises', timeDuration : 30},
        {id : 'p10', postureName : 'Plank', timeDuration : 30},
        {id : 'p11', postureName : 'Cobra Stretch', timeDuration : 30},
        {id : 'p12', postureName : 'spine lumbar twist stretch left', timeDuration : 30},
        {id : 'p13', postureName : 'spine lumbar twist stretch right', timeDuration : 30},
      ]
    },
    {
      id : 'c6',
      title : "อัพไซส์อก (ชายชาตรี)",
      image : "https://i.ytimg.com/vi/TY3ll2Fazvc/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDqzOeNKQQ2VXfqn9T-3pdIRlUg5A",
      desc : "คอร์สออกกำลังกายสำหรับการสร้างกล้ามอกและกล้ามเนื้อหลังแขน เพื่อเสริมสร้างความแข็งแรงของกล้ามเนื้ออก และทำให้หน้าอกดูแน่นและชัดขึ้น",
      postureData : [
        {id : 'p1', postureName : 'Jumping Jack', timeDuration : 30},
        {id : 'p2', postureName : 'Incline Push-up', timeDuration : 20},
        {id : 'p3', postureName : 'Push-up', timeDuration : 20},
        {id : 'p4', postureName : 'Wide arm Push-up', timeDuration : 20},
        {id : 'p5', postureName : 'Tricep Dips', timeDuration : 25},
        {id : 'p6', postureName : 'Wide arm Push-up', timeDuration : 20},
        {id : 'p7', postureName : 'Incline Push-up', timeDuration : 30},
        {id : 'p8', postureName : 'Tricep Dips', timeDuration : 30},
        {id : 'p9', postureName : 'Knee Push-up', timeDuration : 20},
        {id : 'p10', postureName : 'Cobra Strech', timeDuration : 30},
        {id : 'p11', postureName : 'Chest Strech', timeDuration : 30},
      ]
    },

    {
      id : 'c7',
      title : "ให้แขนคุณแบกทุกสิ่ง",
      image : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/young-bodybuilder-working-out-royalty-free-image-1614949873.",
      desc : "คอร์สออกกำลังกายสำหรับการสร้างกล้ามแขน เพื่อเสริมสร้างความแข็งแรงของทั้งแขน และช่วยเพิ่มกำลังและขนาดของแขนให้มากขึ้น",
      postureData : [
        {id : 'p1', postureName : 'Arm Raise', timeDuration : 30},
        {id : 'p2', postureName : 'Side Arm Raise', timeDuration : 20},
        {id : 'p3', postureName : 'Tricep dips', timeDuration : 20},
        {id : 'p4', postureName : 'Arm circles clockwise', timeDuration : 20},
        {id : 'p5', postureName : 'Arm circles counterclockwise', timeDuration : 25},
        {id : 'p6', postureName : 'Diamond Push-up', timeDuration : 20},
        {id : 'p7', postureName : 'Jumping Jacks', timeDuration : 30},
        {id : 'p8', postureName : 'Chest press pulse', timeDuration : 30},
        {id : 'p9', postureName : 'Leg Barbell curl left', timeDuration : 30},
        {id : 'p10', postureName : 'Leg Barbell curl right', timeDuration : 30},
        {id : 'p11', postureName : 'Punches', timeDuration : 30},
        {id : 'p12', postureName : 'Push Ups', timeDuration : 30},
        {id : 'p13', postureName : 'Triceps Strtech Left', timeDuration : 30},
        {id : 'p14', postureName : 'Triceps Strtech Right', timeDuration : 30},
        {id : 'p15', postureName : 'standing biceps stretch Left', timeDuration : 30},
        {id : 'p16', postureName : 'standing biceps stretch Left', timeDuration : 30},
      ]
    },
    {
      id : 'c8',
      title : "ขาเป็นมัดๆ",
      image : "https://www.bodybuilding.com/images/2016/june/leg-workouts-for-men-7-best-workouts-for-quads-glutes-hams-header-v2-960x540.jpg",
      desc : "คอร์สออกกำลังกายสำหรับการสร้างกล้ามเนื้อขา เพื่อเสริมสร้างความแข็งแรงของกล้ามเนื้อขา และเพิ่มประสิทธิภาพของกล้ามเนื้อขา",
      postureData : [
        {id : 'p1', postureName : 'side hop', timeDuration : 60},
        {id : 'p2', postureName : 'squats', timeDuration : 30},
        {id : 'p3', postureName : 'squats', timeDuration : 15},
        {id : 'p4', postureName : 'side-lying leg lift left', timeDuration : 15},
        {id : 'p5', postureName : 'side-lying leg lift right', timeDuration : 20},
        {id : 'p6', postureName : 'side-lying leg lift left', timeDuration : 15},
        {id : 'p7', postureName : 'side-lying leg lift right', timeDuration : 20},
        {id : 'p8', postureName : 'backward lunge', timeDuration : 40},
        {id : 'p9', postureName : 'backward lunge', timeDuration : 40},
        {id : 'p10', postureName : 'donkey kicks left', timeDuration : 60},
        {id : 'p11', postureName : 'donkey kicks right', timeDuration : 60},
        {id : 'p12', postureName : 'donkey kicks left', timeDuration : 60},
        {id : 'p13', postureName : 'donkey kicks right', timeDuration : 60},
        {id : 'p14', postureName : 'left quad stretch with wall', timeDuration : 60},
        {id : 'p15', postureName : 'right quad stretch with wall', timeDuration : 60},
        {id : 'p16', postureName : 'knee to chest stretch left', timeDuration : 60},
        {id : 'p17', postureName : 'knee to chest stretch right', timeDuration : 60},
        {id : 'p18', postureName : 'wall calf raises', timeDuration : 60},
        {id : 'p19', postureName : 'wall calf raises', timeDuration : 60},
        {id : 'p20', postureName : 'sumo squat calf raises with wall', timeDuration : 60},
        {id : 'p21', postureName : 'sumo squat calf raises with wall', timeDuration : 60},
        {id : 'p22', postureName : 'calf stretch left', timeDuration : 60},
        {id : 'p23', postureName : 'calf stretch right', timeDuration : 60},
      ]
    },
    {
      id : 'c9',
      title : "ไหล่และหลัง ได้ทั้งกล้ามและบุคลิก",
      image : "https://www.muscleandfitness.com/wp-content/uploads/2017/09/muscular-back-bodybuilder-1280.jpg?w=1280&h=731&crop=1&quality=86&strip=all",
      desc : "คอร์สออกกำลังกายสำหรับการสร้างกล้ามหลังและไหล่ เพื่อเพิ่มความยืดหยุ่น ลดอาการบาดเจ็บ และแก้ไขบุคลิกภาพของไหล่และหลัง",
      postureData : [
        {id : 'p1', postureName : 'jumping jack', timeDuration : 60},
        {id : 'p2', postureName : 'arm raises', timeDuration : 30},
        {id : 'p3', postureName : 'rhomboid pulls', timeDuration : 15},
        {id : 'p4', postureName : 'side arm raises', timeDuration : 15},
        {id : 'p5', postureName : 'knee push-ups', timeDuration : 20},
        {id : 'p6', postureName : 'side-lying floor stretch left', timeDuration : 40},
        {id : 'p7', postureName : 'side-lying floor stretch right', timeDuration : 60},
        {id : 'p8', postureName : 'arm scissors', timeDuration : 60},
        {id : 'p9', postureName : 'rhomboid pulls', timeDuration : 30},
        {id : 'p10', postureName : 'side arm raises', timeDuration : 15},
        {id : 'p11', postureName : 'knee push-ups', timeDuration : 15},
        {id : 'p12', postureName : 'cat cow pose', timeDuration : 20},
        {id : 'p13', postureName : 'prone triceps push ups', timeDuration : 40},
        {id : 'p14', postureName : 'reclined rhomboid squeezes', timeDuration : 60},
        {id : 'p15', postureName : 'prone triceps push ups', timeDuration : 20},
        {id : 'p16', postureName : 'reclined rhomboid squeezes', timeDuration : 40},
        {id : 'p17', postureName : 'child\'s pose', timeDuration : 60},
      ]
    },
    {
      id : 'c10',
      title : "เผาไขมันขั้นสุดยอด",
      image : "https://www.supznutrition.com/media/image/fd/e4/22/HIIT-WORKOUT.jpg",
      desc : "คอร์สออกกำลังกายแบบ HIIT ช่วยลดไขมันทั้งตัว เผาผลาญแคลอรี่ สร้างกล้ามเนื้อทั้งตัว กระตุ้นการใช้ออกซิเจน ลดอัตราการเต้นของหัวใจ และทำให้สุขภาพดี",
      postureData : [
        {id : 'p1', postureName : 'side hop', timeDuration : 60},
        {id : 'p2', postureName : 'trunk rotation', timeDuration : 30},
        {id : 'p3', postureName : 'butt kicks', timeDuration : 15},
        {id : 'p4', postureName : 'jumping jack', timeDuration : 15},
        {id : 'p5', postureName : 'standing bicycle crunches', timeDuration : 20},
        {id : 'p6', postureName : 'superman ', timeDuration : 40},
        {id : 'p7', postureName : 'russian twist', timeDuration : 60},
        {id : 'p8', postureName : 'reverse crunches', timeDuration : 60},
        {id : 'p9', postureName : 'skipping without rope', timeDuration : 30},
        {id : 'p10', postureName : 'squats', timeDuration : 15},
        {id : 'p11', postureName : 'knee push-ups', timeDuration : 15},
        {id : 'p12', postureName : 'alternating hooks', timeDuration : 20},
        {id : 'p13', postureName : 'triceps stretch right', timeDuration : 40},
        {id : 'p14', postureName : 'triceps stretch left', timeDuration : 60},
        {id : 'p15', postureName : 'right quad stretch with wall', timeDuration : 60},
        {id : 'p16', postureName : 'left quad stretch with wall', timeDuration : 30},
        {id : 'p17', postureName : 'cobra stretch', timeDuration : 15},
      ]
    }
  ]
  const formatTime = (time) => {
    return Math.floor(time/60) + " Min " + time%60 +  " Sec"
  }
  return (
    <View style={styles.container}>

      <View style={[styles.shadowbox, {width : "100%", padding : 10}]}>

        <FlatList data={courseData} renderItem={({item, index}) => 
            <View key={index} style={{height : 370, 
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
                  <Text style={{fontWeight : '700'}}>Time Duration</Text> : {formatTime(item.postureData.map(data => data.timeDuration).reduce((prev, curr) => (prev+15) + curr))}
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

