import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function CommunityScreen({route, navigation}) {
  const [feedData, setFeedData] = useState([
    {postId : "post1",
     userName : "U0012835",
     postTitle : "วันเสาร์-อาทิตย์ ผมกินพิซซ่าได้ไหมครับพรี่", 
     timeStamp : "14 Oct 2022 , 21:05",
     likeCount : 102,
    },
    {postId : "post2",
     userName : "U0086477",
     postTitle : "ออกกำลังกายเวลาไหนดีคะทุกคนน", 
     timeStamp : "14 Oct 2022 , 23:10",
     likeCount : 73,
    },
    {postId : "post3",
     userName : "U0086221",
     postTitle : "เหงาๆ อยากโดนเหลากระบาล", 
     timeStamp : "7 Nov 2022 , 17:03",
     likeCount : 3,
    }
  ])
  const [commentData, setCommentData] = useState([
    {commentId : "comment1",
     comment : "ได้ครับ แต่อย่าเยอะนะ ^^", 
     timeStamp : "14 Oct 2022 , 22:11",
     byUserName : "T090041",
     postId : "post1"
    },
    {commentId : "comment2",
     comment : "กินด้วยจิ ^^",
     timeStamp : "14 Oct 2022 , 22:28",
     byUserName : "T090663",
     postId : "post1"
    },
    {commentId : "comment3",
     comment : "Cheat Day ก็ดีนะ 5555",
     timeStamp : "14 Oct 2022 , 22:53",
     byUserName : "T090722",
     postId : "post1"
    },
    {commentId : "comment4",
     comment : "ออกตอนไหนก็ได้ครับ ขอไม่ขี้เกียจก็พอ อิอิ",
     timeStamp : "14 Oct 2022 , 23:15",
     byUserName : "T090854",
     postId : "post2"
    }
  ])
  const [likedData, setLikedData] = useState([
    {
      likedId : "like01",
      postId : "post02",
      byUserName : "T090854",
      liked : true
    }
  ])
  return (
    <View style={styles.container}>
      <View style={{flexDirection : 'row',
                    width : '100%',
                    height : 70,
                    paddingLeft : 20,
                    paddingTop : 10}}>
        <View style={{width : '50%'}}>
            <Text style={{fontSize : 28, fontWeight : '700'}}>Feeds</Text>
        </View>
      </View>

      <FlatList style={{width : '100%', paddingLeft : 20, paddingRight : 20}}
        data={feedData} renderItem={({item, index}) => {
          return <View
                  style={{width : '100%',
                  height : 120,
                  borderWidth : 1,
                  borderColor : 'lightgray',
                  borderRadius : 5,
                  padding : 15, marginBottom : 10}}>
                  <View style={{flexDirection : 'row', width : '100%'}}>
                    <View style={{width : '50%'}}>
                      <Text style={{fontWeight : '600'}}>{item.userName}</Text>
                    </View>
                    <View style={{position : 'absolute', right : 0}}>
                      <Text>{item.timeStamp.split(',')[1]} น.</Text>
                    </View>
                  </View>

                  <View style={{marginTop : 17, marginBottom : 17}}>
                    <Text>{item.postTitle}</Text>
                  </View>

                  <View style={{flexDirection : 'row',}}>
                      <TouchableOpacity>
                        <Ionicons name='ios-heart-outline' size={22} color={'black'}/>
                      </TouchableOpacity>

                      <Text style={{marginLeft : 5, marginTop : 4, marginRight : 10}}>{item.likeCount}</Text>

                      <TouchableOpacity onPress={() => {
                        navigation.navigate('Post Detail', { postData : item, commentData : commentData.filter(data => data.postId == item.postId) })
                      }}>
                        <Ionicons name='ios-chatbubble-outline' size={22} color={'black'}/>
                      </TouchableOpacity>

                      <Text style={{marginLeft : 5, marginTop : 4}}>{commentData.filter(data => data.postId == item.postId).length}</Text>

                      <Text style={{position : 'absolute', right : 0}}>{item.timeStamp.split(',')[0]}</Text>
                  </View>
          </View>
        }}/>

      {/* <Text>Community</Text>
      <Button title='Post Detail' onPress={() => {navigation.navigate('Post Detail')}} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop : 20,
    // justifyContent: 'center',
  },
});
