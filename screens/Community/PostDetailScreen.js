import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { FlatList } from 'react-native';
//Store data to firebase
import { db } from '../../database/firebase';
import { collection, addDoc, onSnapshot, query, where, deleteDoc, doc, updateDoc, orderBy } from 'firebase/firestore';

import { useSelector } from 'react-redux';

export default function PostDeatilScreen({ route, navigation }) {
  const [postData, setPostData] = useState(route.params.postData)
  const [post, setPost] = useState([])
  const [docId, setDocId] = useState(route.params.docId)

  //commentData
  const [commentData, setCommentData] = useState([])
  const [commentDocId, setCommentDocId] = useState([])

  //likedData
  const [likedData, setLikedData] = useState([])
  const [likedDocId, setLikedDocId] = useState([])
  const [likeC, setLikeC] = useState("")

  const user = useSelector((state) => state.user_data.user)


  const [newComment, setNewComment] = useState("")

  const commentIdGenerate = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  useEffect(() => {

    //Query comment from postId
    const q = query(collection(db, 'comment') , where("postId", "==", postData.postId))
    onSnapshot(q, (snapshot) => {
      setCommentData(snapshot.docs.map(doc => doc.data()))
      setCommentDocId(snapshot.docs.map(doc => doc.id))
    })

    const likeq = query(collection(db, 'likedPost'), where('uid', '==', user.uid))
    onSnapshot(likeq, (snapshot) => {
      setLikedData(snapshot.docs.map(doc => doc.data()))
      setLikedDocId(snapshot.docs.map(doc => doc.id))
    })

    const postq = query(collection(db, 'post'), where('postId', '==', postData.postId))
    onSnapshot(postq, (snapshot) => {
      let s = snapshot.docs.map(doc => doc.data())
      setPost(s)
      try {
        setLikeC(s[0].likeCount < 0 ? 0 : s[0].likeCount)
      }
      catch (e) {
        setLikeC(0)
        navigation.navigate("Community")
      }
    })

  }, [])

  const deleteAPost = () => {
    Alert.alert(
      "ลบ",
      "ต้องการลบโพสต์ของคุณหรือไม่",
      [
        {
          text: 'ยกเลิก',
          onPress: () => { console.log("ม่ายได้ลบ งือ") },
          style: "cancel"
        },
        {
          text: "ตกลง",
          onPress: () => {
            try {
              deleteDoc(doc(db, 'post', docId))

              //Delete multiple record
              for (let i = 0; i < commentDocId.length; i++) {
                deleteDoc(doc(db, 'comment', commentDocId[i]))
              }

              setTimeout(() => {
                navigation.navigate('Community')
              }, 1000)
            }
            catch (e) {
              console.log(e)
            }
          }
        }
      ]
    )
  }

  const sendAComment = () => {
    let getDate = new Date() + ""
    let date = getDate.substring(8, 10) + " " + getDate.substring(4, 7) + " " + getDate.substring(11, 15)
    let time = getDate.substring(16, 21)

    if (newComment == "") {
      console.log(likedData)
    }
    else {
      const commentId = commentIdGenerate()
      try {
        addDoc(collection(db, "comment"), {
          postId: postData.postId,
          byUserName: user.displayName,
          comment: newComment,
          timeStamp: date + " , " + time,
          commentId: commentId,
          uid: user.uid
        })
      }
      catch (e) {
        console.log(e)
      }
      setNewComment("")
    }
  }

  const addLiked = (postId, docId, likeUpdate) => {
    try {
      addDoc(collection(db, "likedPost"), {
        postId: postId,
        userName: user.displayName,
        uid: user.uid
      })

      updateDoc(doc(db, "post", docId), {
        likeCount: likeUpdate
      })
      setLikeC(post[0].likeCount < 0 ? 0 : post[0].likeCount)
    }
    catch (e) {
      console.log(e)
    }
  }

  const unLiked = (docId, likeUpdate) => {
    try {
      deleteDoc(doc(db, 'likedPost', likedDocId[0]))
      updateDoc(doc(db, "post", docId), {
        likeCount: likeUpdate
      })
      setLikeC(!post[0].likeCount < 0 ? 0 : post[0].likeCount)
    }
    catch (e) {
      console.log(e)
    }
  }

  const deleteComment = (commentD) => {
    Alert.alert(
      "ลบ",
      "ต้องการลบความเห็นของคุณหรือไม่",
      [
        {
          text: 'ยกเลิก',
          onPress: () => { console.log("ม่ายได้ลบ งือ") },
          style: "cancel"
        },
        {
          text: "ตกลง",
          onPress: () => {
            try{
              deleteDoc(doc(db, 'comment', commentD))
            }
            catch(e){
              console.log(e)
            }
          }
        }
      ]
    )
  }
  return (
    <View style={styles.container}>

      <View style={{
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        width: '100%',
        height: '100%',
        padding: 15
      }}>
        <View
          style={{
            width: '100%',
            height: 'auto'
          }}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <View style={{ width: '50%', flexDirection: 'row' }}>
              <Text style={{ fontWeight: '600' }}>{postData.userName}</Text>
              {postData.uid == user.uid ?
                <View style={{ marginLeft: 10 }}>
                  <TouchableOpacity onPress={() => { deleteAPost() }}>
                    <Ionicons name='ios-trash-outline' size={17} color={'lightgray'} />
                  </TouchableOpacity>
                </View>
                :
                null
              }
            </View>
            <View style={{ position: 'absolute', right: 0 }}>
              <Text>{postData.timeStamp.split(',')[1]} น.</Text>
            </View>
          </View>

          <View style={{ marginTop: 17, marginBottom: 17 }}>
            <Text>{postData.postTitle}</Text>
          </View>

          <View style={{ flexDirection: 'row', }}>
            {likedData.filter(data => postData.postId == data.postId) != 0 ?
              <TouchableOpacity onPress={() => { unLiked(docId, post[0].likeCount - 1) }}>
                <Ionicons name='ios-heart' size={22} color={'red'} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => { addLiked(postData.postId, docId, post[0].likeCount + 1) }}>
                <Ionicons name='ios-heart-outline' size={22} color={'black'} />
              </TouchableOpacity>
            }

            <Text style={{ marginLeft: 5, marginTop: 4, marginRight: 10 }}>{likeC}</Text>

            <TouchableOpacity>
              <Ionicons name='ios-chatbubble-outline' size={22} color={'black'} />
            </TouchableOpacity>

            <Text style={{ marginLeft: 5, marginTop: 4 }}>{commentData.filter(data => data.postId == postData.postId).length}</Text>

            <Text style={{ position: 'absolute', right: 0 }}>{postData.timeStamp.split(',')[0]}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <TextInput style={{
            borderWidth: 1,
            borderColor: 'lightgray',
            borderRadius: 5,
            width: '75%',
            height: 40,
            marginTop: 20,
            paddingLeft: 10
          }}
            placeholder="เขียนความเห็นที่นี่"
            onChangeText={setNewComment}
            value={newComment} />
          <TouchableOpacity style={{
            height: 40,
            borderRadius: 5,
            backgroundColor: 'lightblue',
            alignItems: 'center',
            justifyContent: 'center',
            width: '20%',
            position: 'absolute',
            right: 0,
            marginTop: 20
          }}
            onPress={() => { sendAComment() }}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>ส่ง</Text>
          </TouchableOpacity>
        </View>

        <FlatList data={commentData} renderItem={({ item, index }) => {
          return <View style={{
            width: '100%',
            height: 'auto',
            marginTop: 20,
            borderBottomWidth: 1,
            paddingBottom: 20,
            borderBottomColor: 'lightgray'
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: '700' }}>{item.byUserName}</Text>
              {item.uid == user.uid ?
                <View style={{ marginLeft: 10 }}>
                  <TouchableOpacity onPress={() => { deleteComment(commentDocId[index]) }}>
                    <Ionicons name='ios-trash-outline' size={17} color={'lightgray'} />
                  </TouchableOpacity>
                </View>
                :
                null
              }
              <Text style={{ position: 'absolute', right: 0, fontWeight: '500' }}>{item.timeStamp}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
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
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
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
