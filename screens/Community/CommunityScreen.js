import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, RefreshControl, Alert } from 'react-native';
import { FlatList } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
//Store and Get data to firebase
import { db } from '../../database/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, query, orderBy, doc, where, updateDoc} from 'firebase/firestore';
import { useSelector } from 'react-redux';

export default function CommunityScreen({route, navigation}) {
  const [newPost, setNewPost] = useState("")
  const [refreshing, setRefreshing] = useState(false);

  const postIdGenerate = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  //Fetch Data
  useEffect(() => {

    //Subscribe Firebase event 
    const postQuery = query(collection(db, "post"), orderBy("timeStamp"))
    onSnapshot(postQuery, (snapshot) => {
      setFeedData(snapshot.docs.map(doc => doc.data()))
      setDocId(snapshot.docs.map(doc => doc.id))
    })

    //Get comment for count a comment
    onSnapshot(collection(db, 'comment'), (snapshot) => {
      setCommentData(snapshot.docs.map(doc => doc.data()))
      setCommentDocId(snapshot.docs.map(doc => doc.id))
    })

    //Query account liked post
    const likedQuery = query(collection(db, 'likedPost'), where("uid", "==", user.uid))
    onSnapshot(likedQuery, (snapshot) => {
      setLikedData(snapshot.docs.map(doc => doc.data()))
      setLikedDocId(snapshot.docs.map(doc => doc.id))
    })

  }, [])

  const pullMe = () => {
    setRefreshing(true)

    setTimeout(() => {
      setRefreshing(false)
      console.log("Refresh...")
    }, 1000)
  }

  //** docId ใน firebase ไว้ใช้เข้าถึงข้อมูลแถวนั้นๆ **/

  const [feedData, setFeedData] = useState([])
  const [docId, setDocId] = useState([]) //docId from Firebase *ใช้ลบข้อมูล เอา id นี้ไปใส่

  const [commentData, setCommentData] = useState([])
  const [commentDocId, setCommentDocId] = useState([])

  const [likedData, setLikedData] = useState([])
  const [likedDocId, setLikedDocId] = useState([])


  const user = useSelector((state) => state.user_data.user)

  const sendAPost = () => {
    let getDate = new Date()+""
    let date = getDate.substring(8, 10) + " " + getDate.substring(4, 7) + " " + getDate.substring(11, 15)
    let time = getDate.substring(16, 21)
    if(newPost === ""){
      console.log("")
    }
    else{
      const postId = postIdGenerate()
      try{
        addDoc(collection(db, "post"), {
          postId : postId,
          userName : user.displayName,
          postTitle : newPost,
          timeStamp : date + " , " + time,
          likeCount : 0,
          uid : user.uid
        })
      }
      catch(e){
        console.log(e)
      }
      setNewPost("")
    }
  }

  const deleteAPost = (docId, commentDocIndex) => {
    Alert.alert(
      "ลบ",
      "ต้องการลบโพสต์ของคุณหรือไม่",
      [
        {
          text : 'ยกเลิก',
          onPress : () => {console.log("ม่ายได้ลบ งือ")},
          style : "cancel"
        },
        {
          text : "ตกลง",
          onPress : () => {
            try{
              deleteDoc(doc(db, 'post', docId))

              //Delete multiple record
              for(let i=0;i<commentDocIndex.length;i++){
                deleteDoc(doc(db, 'comment', commentDocId[commentDocIndex[i]]))
              }
            }
            catch(e){
              console.log(e)
            }
          }
        }
      ]
    )
  }

  const addLiked = (userId, postId, docId, likeUpdate) => {
    try{
      addDoc(collection(db, "likedPost"), {
        postId : postId,
        userName : user.displayName,
        uid : userId
      })

      updateDoc(doc(db, "post", docId), {
        likeCount : likeUpdate
      })
    }
    catch(e){
      console.log(e)
    }
  }

  const unLiked = (likeDocIndex, docId, likeUpdate) => {
    try{
      deleteDoc(doc(db, 'likedPost', likedDocId[likeDocIndex[0]]))
      updateDoc(doc(db, "post", docId), {
        likeCount : likeUpdate
      })
    }
    catch(e){
      console.log(e)
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={{flexDirection : 'row',
                    width : '100%',
                    height : 70,
                    paddingLeft : 20,
                    paddingTop : 10}}>
        <View style={{width : '50%'}}>
            <Text style={{fontSize : 28, fontWeight : '700'}}>ฟีด</Text>
        </View>
      </View>

      <View style={{flexDirection : 'row', width : '95%', padding : 20}}>
          <TextInput style={{borderWidth : 1,
                            borderColor : 'lightgray',
                            borderRadius : 5,
                            width : '75%',
                            height : 'auto',
                            marginTop : -10,
                            paddingLeft : 10,
                            paddingTop : 10}}
                      placeholder="เขียนโพสต์ที่นี่!"
                      multiline={true}
                      numberOfLines={4}
                      onChangeText={setNewPost}
                      value={newPost} />
          <TouchableOpacity style={{height : 40, 
                                    borderRadius : 5,
                                    backgroundColor : 'lightblue', 
                                    alignItems : 'center', 
                                    justifyContent : 'center',
                                    width : '20%', marginTop : -10, marginLeft : 14}}
                                    onPress={() => {sendAPost()}}>
            <Text style={{color : 'white', fontWeight : '600', fontSize : 16}}>โพสต์</Text>
          </TouchableOpacity>
      </View>

      {feedData.length == 0 ? null : 
        <FlatList style={{width : '100%', paddingLeft : 20, paddingRight : 20}}
        data={feedData} 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { pullMe() }} />
        }
        renderItem={({item, index}) => {
          return <View
                  style={{width : '100%',
                  height : 'auto',
                  borderRadius : 5,
                  padding : 15, marginBottom : 10,
                  shadowColor: '#171717',
                  shadowOffset: {width: -2, height: 4},
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  backgroundColor : '#fff'
                  }}>
                  <View style={{flexDirection : 'row', width : '100%'}}>
                    <View style={{width : '50%', flexDirection : 'row'}}>
                      <Text style={{fontWeight : '600'}}>{item.userName}</Text>
                      {item.uid == user.uid ? 
                      <View style={{marginLeft : 10}}>
                        <TouchableOpacity onPress={() => {deleteAPost(docId[index], 
                                                          //Map เอา Index ที่จะไปเอาข้อมูลใน commentDocId เพื่อเอามาลบ comment ของ post ออกไป
                                                          commentData.map((data, index) => data.postId == item.postId ? index : null).filter(data => data != null))}}>
                          <Ionicons name='ios-trash-outline' size={17} color={'lightgray'} />
                        </TouchableOpacity>
                      </View>
                      :
                      null
                      }
                    </View>
                    <View style={{position : 'absolute', right : 0}}>
                      <Text style={{position : 'absolute', right : 0}}>{item.timeStamp.split(',')[0]}</Text>
                    </View>
                  </View>

                  <View style={{marginTop : 17, marginBottom : 17, flexDirection : 'row', width : '100%'}}>
                    <Text>{item.postTitle}</Text>
                  </View>

                  <View style={{flexDirection : 'row',}}>
                      {likedData.filter(data => data.postId == item.postId).length != 0 ? 
                        <TouchableOpacity onPress={() => {unLiked(likedData.map((data, index) => data.postId == item.postId ? index : null).filter(data => data != null),
                                                                  docId[index], item.likeCount-1)}}>
                          <Ionicons name='ios-heart' size={22} color={'red'}/>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => {addLiked(user.uid, item.postId, docId[index], item.likeCount+1)}}>
                          <Ionicons name='ios-heart-outline' size={22} color={'black'}/>
                        </TouchableOpacity>
                      }

                      <Text style={{marginLeft : 5, marginTop : 4, marginRight : 10}}>{item.likeCount}</Text>

                      <TouchableOpacity onPress={() => {
                        navigation.navigate('Post Detail', { postData : item, docId : docId[index] })
                      }}>
                        <Ionicons name='ios-chatbubble-outline' size={22} color={'black'}/>
                      </TouchableOpacity>

                      <Text style={{marginLeft : 5, marginTop : 4}}>{commentData.filter(data => data.postId == item.postId).length}</Text>

                      <Text style={{position : 'absolute', right : 0}}>{item.timeStamp.split(',')[1]} น.</Text>
                  </View>
          </View>
        }}/>
      }
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
