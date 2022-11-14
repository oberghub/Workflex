import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import { FlatList } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
//Store and Get data to firebase
import { db } from '../../database/firebase';
import { collection, addDoc, getDocs, onSnapshot} from 'firebase/firestore';
import { useSelector } from 'react-redux';

export default function CommunityScreen({route, navigation}) {
  const [newPost, setNewPost] = useState("")
  const [refreshing, setRefreshing] = useState(false);

  const postIdGenerate = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  //Fetch Data
  useEffect(() => {
    const getPost = async () => {
      const postData = await getDocs(collection(db, 'post'))
      setFeedData(postData.docs.map(doc => doc.data()).sort((a, b) => {
        if (a.timeStamp < b.timeStamp) {
          return -1;
        }
        if (a.timeStamp > b.timeStamp) {
          return 1;
        }
        // names must be equal
        return 0;
      }))
    }
    const getComment = async () => {
      const commentData = await getDocs(collection(db, 'comment'))
      setCommentData(commentData.docs.map(doc => doc.data()))
    }
    getPost()
    getComment()
  }, [])
  const pullMe = () => {
    setRefreshing(true)

    setTimeout(() => {
      setRefreshing(false)
      console.log("Refresh...")
    }, 1000)
  }


  const [feedData, setFeedData] = useState([])
  const [commentData, setCommentData] = useState([])
  const [likedData, setLikedData] = useState([])
  const user = useSelector((state) => state.user_data.user)

  const sendAPost = () => {
    let getDate = new Date()+""
    let date = getDate.substring(8, 10) + " " + getDate.substring(4, 7) + " " + getDate.substring(11, 15)
    let time = getDate.substring(16, 21)


    if(newPost == ""){
      console.log("")
    }
    else{
      const postId = postIdGenerate()
      let lst = [...feedData]
      let idcount = lst.length+1
      lst.push({
        postId : "post"+idcount,
        userName : "แกะนิรนาม",
        postTitle : newPost,
        timeStamp : date + " , " + time,
        likeCount : 0
      })
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
      setFeedData(lst)
      setNewPost("")
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
            <Text style={{fontSize : 28, fontWeight : '700'}}>Feeds</Text>
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
                      placeholder="Write your post"
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
            <Text style={{color : 'white', fontWeight : '600', fontSize : 16}}>Post</Text>
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
      }

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
