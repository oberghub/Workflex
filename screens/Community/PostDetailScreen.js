import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { FlatList } from 'react-native';
//Store data to firebase
import { db } from '../../database/firebase';
import { collection, addDoc } from 'firebase/firestore';

import { useSelector } from 'react-redux';

export default function PostDeatilScreen({route, navigation}) {
  const [postData, setPostData] = useState(route.params.postData)
  const [commentData, setCommentData] = useState([...route.params.commentData])
  const user = useSelector((state) => state.user_data.user)
  const [newComment, setNewComment] = useState("")
  const commentIdGenerate = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
  const loopData = () => {
    console.log(postData)
    for(let i=0; i<commentData.length;i++){
      console.log(commentData[i])
    }
  }

  const sendAComment = () => {
    let getDate = new Date()+""
    let date = getDate.substring(8, 10) + " " + getDate.substring(4, 7) + " " + getDate.substring(11, 15)
    let time = getDate.substring(16, 21)

    if(newComment == ""){
      console.log("")
    }
    else{
      const commentId = commentIdGenerate()
      let lst = [...commentData]
      let idcount = lst.length+1
      lst.push({
        postId : postData.postId,
        byUserName : user.displayName,
        comment : newComment,
        timeStamp : date + " , " + time,
        commentId : commentId,
        uid : user.uid
      })
        try{
          addDoc(collection(db, "comment"), {
            postId : postData.postId,
            byUserName : user.displayName,
            comment : newComment,
            timeStamp : date + " , " + time,
            commentId : commentId,
            uid : user.uid
          })
        }
        catch(e){
          console.log(e)
        }
      setCommentData(lst)
      setNewComment("")
    }
  }
  return (
    <View style={styles.container}>

      <View style={{
        borderTopWidth : 1,
        borderLeftWidth : 1,
        borderRightWidth : 1,
        borderColor : 'lightgray',
        borderRadius : 5,
        width : '100%',
        height : '100%',
        padding : 15
      }}>
        <View
          style={{width : '100%',
          height : 'auto'}}>
          <View style={{flexDirection : 'row', width : '100%'}}>
            <View style={{width : '50%'}}>
              <Text style={{fontWeight : '600'}}>{postData.userName}</Text>
            </View>
            <View style={{position : 'absolute', right : 0}}>
              <Text>{postData.timeStamp.split(',')[1]} น.</Text> 
            </View>
          </View>

          <View style={{marginTop : 17, marginBottom : 17}}>
            <Text>{postData.postTitle}</Text>
          </View>

          <View style={{flexDirection : 'row',}}>
              <TouchableOpacity>
                <Ionicons name='ios-heart-outline' size={22} color={'black'}/>
              </TouchableOpacity>

              <Text style={{marginLeft : 5, marginTop : 4, marginRight : 10}}>{postData.likeCount}</Text>

              <TouchableOpacity>
                <Ionicons name='ios-chatbubble-outline' size={22} color={'black'}/>
              </TouchableOpacity>

              <Text style={{marginLeft : 5, marginTop : 4}}>{commentData.filter(data => data.postId == postData.postId).length}</Text>

              <Text style={{position : 'absolute', right : 0}}>{postData.timeStamp.split(',')[0]}</Text>
          </View>
        </View>
        <View style={{flexDirection : 'row', width : '100%'}}>
          <TextInput style={{borderWidth : 1,
                            borderColor : 'lightgray',
                            borderRadius : 5,
                            width : '75%',
                            height : 40,
                            marginTop : 20,
                            paddingLeft : 10}}
                      placeholder="Write a comment"
                      onChangeText={setNewComment}
                      value={newComment} />
          <TouchableOpacity style={{height : 40, 
                                    borderRadius : 5,
                                    backgroundColor : 'lightblue', 
                                    alignItems : 'center', 
                                    justifyContent : 'center',
                                    width : '20%',
                                    position : 'absolute',
                                    right : 0,
                                    marginTop : 20}}
                                    onPress={() => {sendAComment()}}>
            <Text style={{color : 'white', fontWeight : '600', fontSize : 16}}>Send</Text>
          </TouchableOpacity>
        </View>

      <FlatList data={commentData} renderItem={({item, index}) => {
          return <View style={{
            width : '100%',
            height : 'auto',
            marginTop : 20,
            borderBottomWidth : 1,
            paddingBottom : 20,
            borderBottomColor : 'lightgray'}}>
            <View style={{flexDirection : 'row'}}>
              <Text style={{fontWeight : '700'}}>{item.byUserName}</Text>
              <Text style={{position : 'absolute', right : 0, fontWeight : '500'}}>{item.timeStamp}</Text>
            </View>
            <View style={{flexDirection : 'row', marginTop : 10}}>
              <Text>{item.comment}</Text>
            </View>
          </View> 
        }} />

      </View>
      {/* View ใหญ่ */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop : 20,
    paddingLeft : 20,
    paddingRight : 20
  },
});

{/* <View style={{
  width : '100%',
  height : 'auto',
  marginTop : 20,
  borderBottomWidth : 1,
  paddingBottom : 20,
  borderBottomColor : 'lightgray'}}>
  <View style={{flexDirection : 'row'}}>
    <Text style={{fontWeight : '700'}}>T0900051</Text>
    <Text style={{position : 'absolute', right : 0, fontWeight : '500'}}>14 Oct 2022 Time 21:04</Text>
  </View>
  <View style={{flexDirection : 'row', marginTop : 10}}>
    <Text>แล้วเป็นควยไรแม่เย็ดแล้วเป็นควยไรแม่เย็ดแล้วเป็นควยไรแม่เย็ดแล้วเป็นควยไรแม่เย็ดแล้วเป็นควยไรแม่เย็ดแล้วเป็นควยไรแม่เย็ดแล้วเป็นควยไรแม่เย็ด</Text>
  </View>
</View> */}