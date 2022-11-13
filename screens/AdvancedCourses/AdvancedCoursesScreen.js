import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const AdvancedCoursesScreen = ({navigation})  => {
  const courseData = [
    {
      id : 'c1',
      title : "เปลี่ยน One Pack เป็น Six Pack!",
      image : "https://static.india.com/wp-content/uploads/2017/01/six-packs.jpg?impolicy=Medium_Resize&w=1200&h=800",
      desc : "คอร์สออกกำลังกายสำหรับการสร้างกล้ามเนื้อหน้าท้อง เพื่อเสริมสร้างความแข็งแรงของกล้ามเนื้อหน้าท้อง",
      postureData : [
        {id : 'p1', pTitle : 'Jumping Jack', timeDuration : 30},
        {id : 'p2', pTitle : 'Russian Twist', timeDuration : 30},
        {id : 'p3', pTitle : 'Mountain Climber', timeDuration : 30},
        {id : 'p4', pTitle : 'Heel Touch', timeDuration : 30},
        {id : 'p5', pTitle : 'Leg Raises', timeDuration : 30},
        {id : 'p6', pTitle : 'Plank', timeDuration : 30},
        {id : 'p7', pTitle : 'Abdominal Crunches', timeDuration : 30},
        {id : 'p8', pTitle : 'Heel Touch', timeDuration : 30},
        {id : 'p9', pTitle : 'Leg Raises', timeDuration : 30},
        {id : 'p10', pTitle : 'Plank', timeDuration : 30},
        {id : 'p11', pTitle : 'Cobra Stretch', timeDuration : 30},
        {id : 'p12', pTitle : 'spine lumbar twist stretch left', timeDuration : 30},
        {id : 'p13', pTitle : 'spine lumbar twist stretch right', timeDuration : 30},
      ]
    },
    {
      id : 'c2',
      title : "อัพไซส์อก (ชายชาตรี)",
      image : "https://i.ytimg.com/vi/TY3ll2Fazvc/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDqzOeNKQQ2VXfqn9T-3pdIRlUg5A",
      desc : "คอร์สออกกำลังกายสำหรับการสร้างกล้ามอกและกล้ามเนื้อหลังแขน เพื่อเสริมสร้างความแข็งแรงของกล้ามเนื้ออก และทำให้หน้าอกดูแน่นและชัดขึ้น",
      postureData : [
        {id : 'p1', pTitle : 'Jumping Jack', timeDuration : 30},
        {id : 'p2', pTitle : 'Incline Push-up', timeDuration : 20},
        {id : 'p3', pTitle : 'Push-up', timeDuration : 20},
        {id : 'p4', pTitle : 'Wide arm Push-up', timeDuration : 20},
        {id : 'p5', pTitle : 'Tricep Dips', timeDuration : 25},
        {id : 'p6', pTitle : 'Wide arm Push-up', timeDuration : 20},
        {id : 'p7', pTitle : 'Incline Push-up', timeDuration : 30},
        {id : 'p8', pTitle : 'Tricep Dips', timeDuration : 30},
        {id : 'p9', pTitle : 'Knee Push-up', timeDuration : 20},
        {id : 'p10', pTitle : 'Cobra Strech', timeDuration : 30},
        {id : 'p11', pTitle : 'Chest Strech', timeDuration : 30},
      ]
    },

    //c3-c6 ยังไม่ได้ใส่ท่าออกกำลังกาย
    {
      id : 'c3',
      title : "ให้แขนคุณแบกทุกสิ่ง",
      image : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/young-bodybuilder-working-out-royalty-free-image-1614949873.",
      desc : "คอร์สออกกำลังกายสำหรับการสร้างกล้ามแขน เพื่อเสริมสร้างความแข็งแรงของทั้งแขน และช่วยเพิ่มกำลังและขนาดของแขนให้มากขึ้น",
      postureData : [
        {id : 'p1', pTitle : 'Arm Raise', timeDuration : 30},
        {id : 'p2', pTitle : 'Side Arm Raise', timeDuration : 20},
        {id : 'p3', pTitle : 'Tricep dips', timeDuration : 20},
        {id : 'p4', pTitle : 'Arm circles clockwise', timeDuration : 20},
        {id : 'p5', pTitle : 'Arm circles counterclockwise', timeDuration : 25},
        {id : 'p6', pTitle : 'Diamond Push-up', timeDuration : 20},
        {id : 'p7', pTitle : 'Jumping Jacks', timeDuration : 30},
        {id : 'p8', pTitle : 'Chest press pulse', timeDuration : 30},
        {id : 'p9', pTitle : 'Leg Barbell curl left', timeDuration : 30},
        {id : 'p10', pTitle : 'Leg Barbell curl right', timeDuration : 30},
        {id : 'p11', pTitle : 'Punches', timeDuration : 30},
        {id : 'p12', pTitle : 'Push Ups', timeDuration : 30},
        {id : 'p13', pTitle : 'Triceps Strtech Left', timeDuration : 30},
        {id : 'p14', pTitle : 'Triceps Strtech Right', timeDuration : 30},
        {id : 'p15', pTitle : 'standing biceps stretch Left', timeDuration : 30},
        {id : 'p16', pTitle : 'standing biceps stretch Left', timeDuration : 30},
      ]
    },
    {
      id : 'c4',
      title : "ขาเป็นมัดๆ",
      image : "https://www.bodybuilding.com/images/2016/june/leg-workouts-for-men-7-best-workouts-for-quads-glutes-hams-header-v2-960x540.jpg",
      desc : "คอร์สออกกำลังกายสำหรับการสร้างกล้ามเนื้อขา เพื่อเสริมสร้างความแข็งแรงของกล้ามเนื้อขา และเพิ่มประสิทธิภาพของกล้ามเนื้อขา",
      postureData : [
        {id : 'p1', pTitle : 'side hop', timeDuration : 60},
        {id : 'p2', pTitle : 'squats', timeDuration : 30},
        {id : 'p3', pTitle : 'squats', timeDuration : 15},
        {id : 'p4', pTitle : 'side-lying leg lift left', timeDuration : 15},
        {id : 'p5', pTitle : 'side-lying leg lift right', timeDuration : 20},
        {id : 'p6', pTitle : 'side-lying leg lift left', timeDuration : 15},
        {id : 'p7', pTitle : 'side-lying leg lift right', timeDuration : 20},
        {id : 'p8', pTitle : 'backward lunge', timeDuration : 40},
        {id : 'p9', pTitle : 'backward lunge', timeDuration : 40},
        {id : 'p10', pTitle : 'donkey kicks left', timeDuration : 60},
        {id : 'p11', pTitle : 'donkey kicks right', timeDuration : 60},
        {id : 'p12', pTitle : 'donkey kicks left', timeDuration : 60},
        {id : 'p13', pTitle : 'donkey kicks right', timeDuration : 60},
        {id : 'p14', pTitle : 'left quad stretch with wall', timeDuration : 60},
        {id : 'p15', pTitle : 'right quad stretch with wall', timeDuration : 60},
        {id : 'p16', pTitle : 'knee to chest stretch left', timeDuration : 60},
        {id : 'p17', pTitle : 'knee to chest stretch right', timeDuration : 60},
        {id : 'p18', pTitle : 'wall calf raises', timeDuration : 60},
        {id : 'p19', pTitle : 'wall calf raises', timeDuration : 60},
        {id : 'p20', pTitle : 'sumo squat calf raises with wall', timeDuration : 60},
        {id : 'p21', pTitle : 'sumo squat calf raises with wall', timeDuration : 60},
        {id : 'p22', pTitle : 'calf stretch left', timeDuration : 60},
        {id : 'p23', pTitle : 'calf stretch right', timeDuration : 60},
      ]
    },
    {
      id : 'c5',
      title : "ไหล่และหลัง ได้ทั้งกล้ามและบุคลิก",
      image : "https://www.muscleandfitness.com/wp-content/uploads/2017/09/muscular-back-bodybuilder-1280.jpg?w=1280&h=731&crop=1&quality=86&strip=all",
      desc : "คอร์สออกกำลังกายสำหรับการสร้างกล้ามหลังและไหล่ เพื่อเพิ่มความยืดหยุ่น ลดอาการบาดเจ็บ และแก้ไขบุคลิกภาพของไหล่และหลัง",
      postureData : [
        {id : 'p1', pTitle : 'jumping jack', timeDuration : 60},
        {id : 'p2', pTitle : 'arm raises', timeDuration : 30},
        {id : 'p3', pTitle : 'rhomboid pulls', timeDuration : 15},
        {id : 'p4', pTitle : 'side arm raises', timeDuration : 15},
        {id : 'p5', pTitle : 'knee push-ups', timeDuration : 20},
        {id : 'p6', pTitle : 'side-lying floor stretch left', timeDuration : 40},
        {id : 'p7', pTitle : 'side-lying floor stretch right', timeDuration : 60},
        {id : 'p8', pTitle : 'arm scissors', timeDuration : 60},
        {id : 'p9', pTitle : 'rhomboid pulls', timeDuration : 30},
        {id : 'p10', pTitle : 'side arm raises', timeDuration : 15},
        {id : 'p11', pTitle : 'knee push-ups', timeDuration : 15},
        {id : 'p12', pTitle : 'cat cow pose', timeDuration : 20},
        {id : 'p13', pTitle : 'prone triceps push ups', timeDuration : 40},
        {id : 'p14', pTitle : 'reclined rhomboid squeezes', timeDuration : 60},
        {id : 'p15', pTitle : 'prone triceps push ups', timeDuration : 20},
        {id : 'p16', pTitle : 'reclined rhomboid squeezes', timeDuration : 40},
        {id : 'p17', pTitle : 'child\'s pose', timeDuration : 60},
      ]
    },
    {
      id : 'c6',
      title : "เผาไขมันขั้นสุดยอด",
      image : "https://www.supznutrition.com/media/image/fd/e4/22/HIIT-WORKOUT.jpg",
      desc : "คอร์สออกกำลังกายแบบ HIIT ช่วยลดไขมันทั้งตัว เผาผลาญแคลอรี่ สร้างกล้ามเนื้อทั้งตัว กระตุ้นการใช้ออกซิเจน ลดอัตราการเต้นของหัวใจ และทำให้สุขภาพดี",
      postureData : [
        {id : 'p1', pTitle : 'side hop', timeDuration : 60},
        {id : 'p2', pTitle : 'trunk rotation', timeDuration : 30},
        {id : 'p3', pTitle : 'butt kicks', timeDuration : 15},
        {id : 'p4', pTitle : 'jumping jack', timeDuration : 15},
        {id : 'p5', pTitle : 'standing bicycle crunches', timeDuration : 20},
        {id : 'p6', pTitle : 'superman ', timeDuration : 40},
        {id : 'p7', pTitle : 'russian twist', timeDuration : 60},
        {id : 'p8', pTitle : 'reverse crunches', timeDuration : 60},
        {id : 'p9', pTitle : 'skipping without rope', timeDuration : 30},
        {id : 'p10', pTitle : 'squats', timeDuration : 15},
        {id : 'p11', pTitle : 'knee push-ups', timeDuration : 15},
        {id : 'p12', pTitle : 'alternating hooks', timeDuration : 20},
        {id : 'p13', pTitle : 'triceps stretch right', timeDuration : 40},
        {id : 'p14', pTitle : 'triceps stretch left', timeDuration : 60},
        {id : 'p15', pTitle : 'right quad stretch with wall', timeDuration : 60},
        {id : 'p16', pTitle : 'left quad stretch with wall', timeDuration : 30},
        {id : 'p17', pTitle : 'cobra stretch', timeDuration : 15},
        {id : 'p18', pTitle : 'สวัสดีครับ', timeDuration : 15},
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
            <View style={{height : 370, 
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
                  navigation.navigate("Adv Course Detail", {categoryTitle : item.title, postureData : item.postureData})
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

export default AdvancedCoursesScreen;

