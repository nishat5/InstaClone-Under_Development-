// //import liraries
// import React, { useContext, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Button,
//   Image,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import MainHeader from '../components/MainHeader';
// import { UserContext } from '../context/UserContext';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { PostsContext } from '../context/PostsContext';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import PostCard from '../components/PostCard';

// // create a component
// const MyProfileScreen = ({ navigation }) => {
//   const { user } = useContext(UserContext);
//   const { posts } = useContext(PostsContext);
//   const [postCount, setPostCount] = useState(null);
//   const [loggedUserPosts, setLoggedUserPosts] = useState(null);

//   const [followersCount, setFollowersCount] = useState(0);
// const [followingCount, setFollowingCount] = useState(0);

//   const fetchPostCount = async uid => {
//     try {
//       const snapshot = await firestore()
//         .collection('Posts')
//         .where('userId', '==', uid)
//         .get();

//       setPostCount(snapshot.size);
//     } catch (error) {
//       console.error('Error fetching posts length:', error);
//       return null;
//     }
//   };

//   const fetchCurrentUserPosts = () => {
//     const userPosts = posts.filter(
//       post => post.userId == auth().currentUser.uid,
//     );
//     setLoggedUserPosts(userPosts);
//   };

//   useEffect(() => {
//     fetchPostCount(user.userId);
//     fetchCurrentUserPosts();
//     fetchFollowersCount(uid);
// fetchFollowingCount(uid);
//     // console.log('Posts: ', loggedUserPosts);
//   }, []);

//   const renderUserPosts = ({ item }) => {
//     return (
//       <TouchableOpacity style={styles.singlePostingContainer}>
//         <Image source={{ uri: item.postImage }} style={styles.singlePosting} />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <MainHeader ProfileScreen={true} userName={user.username} />

//       <View style={styles.headerContainer}>
//         <Image
//           style={styles.img}
//           source={{
//             uri: user.photoUrl,
//           }}
//         />

//         <View style={styles.innerContainer}>
//           <Text style={styles.text}>
//             {postCount !== null && <Text>{postCount}</Text>}
//           </Text>
//           <Text style={styles.text}>Posts</Text>
//         </View>
//         <TouchableOpacity style={styles.innerContainer}>
//            <Text style={styles.text}>{followersCount}</Text>
//           <Text style={styles.text}>Followers</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.innerContainer}>
//            <Text style={styles.text}>{followingCount}</Text>
//           <Text style={styles.text}>Following</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.userInfoContainer}>
//         <Text style={styles.userInfoText}>{user.username}</Text>
//         <Text style={styles.userInfoText}>Bio........</Text>
//       </View>

//       <View style={styles.btnMainContainer}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('Setting')}
//           style={styles.btnContainer}
//         >
//           <Text style={styles.btnText}>Edit Profile</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.btnContainer}>
//           <Text style={styles.btnText}>Share Profile</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.iconContainer}>
//           <Ionicons name="person-add" size={21} color="white" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.userPostContainer}>
//         <FlatList
//           numColumns={2}
//           key={2}
//           data={loggedUserPosts}
//           keyExtractor={item => item.id}
//           renderItem={renderUserPosts}
//         />
//       </View>
//       {/* <Button
//         title="GO Forward"
//         onPress={() => navigation.navigate('Setting')}
//       /> */}
//     </View>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     marginTop: hp('1.5%'),
//   },
//   img: {
//     width: wp('24%'),
//     height: wp('24%'),
//     borderRadius: wp('12%'),
//     borderWidth: 2,
//     borderColor: 'silver',
//   },
//   innerContainer: {
//     padding: wp('1%'),
//   },
//   text: {
//     textAlign: 'center',
//     fontSize: wp('4%'),
//     fontFamily: 'Roboto-Bold',
//   },
//   userInfoContainer: {
//     marginHorizontal: wp('4%'),
//     marginTop: 3,
//   },
//   userInfoText: {
//     fontSize: wp('3.7%'),
//     fontFamily: 'Roboto-Regular',
//   },
//   btnMainContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: wp('2%'),
//     paddingVertical: wp('2%'),
//   },
//   btnContainer: {
//     width: wp('42%'),
//     padding: wp('2%'),
//     borderRadius: wp('2%'),
//     backgroundColor: '#484849ff',
//   },
//   btnText: {
//     textAlign: 'center',
//     fontSize: wp('4%'),
//     fontFamily: 'Roboto-Bold',
//     color: 'white',
//   },
//   iconContainer: {
//     backgroundColor: '#484849ff',
//     borderRadius: wp('2%'),
//     width: wp('9%'),
//     height: wp('9%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   userPostContainer: {
//     marginHorizontal: wp('2%'),
//     marginTop: hp('1%'),
//   },
//   singlePostingContainer: {
//     marginRight: wp('2%'),
//   },
//   singlePosting: {
//     width: wp('30%'),
//     height: wp('40%'),
//     borderRadius: wp('1%'),
//   },
// });

// //make this component available to the app
// export default MyProfileScreen;

//import liraries
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import MainHeader from '../components/MainHeader';
import { UserContext } from '../context/UserContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PostsContext } from '../context/PostsContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
const MyProfileScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { posts } = useContext(PostsContext);

  const [postCount, setPostCount] = useState(null);
  const [loggedUserPosts, setLoggedUserPosts] = useState(null);

  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const fetchPostCount = async uid => {
    try {
      const snapshot = await firestore()
        .collection('Posts')
        .where('userId', '==', uid)
        .get();
      setPostCount(snapshot.size);
    } catch (error) {
      console.error('Error fetching posts length:', error);
    }
  };

  const fetchCurrentUserPosts = () => {
    const userPosts = posts.filter(
      post => post.userId == auth().currentUser.uid,
    );
    setLoggedUserPosts(userPosts);
  };

  const fetchFollowersCount = async uid => {
    try {
      const snapshot = await firestore()
        .collection('allusers')
        .doc(uid)
        .collection('followers')
        .get();
      setFollowersCount(snapshot.size);
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  };

  const fetchFollowingCount = async uid => {
    try {
      const snapshot = await firestore()
        .collection('allusers')
        .doc(uid)
        .collection('following')
        .get();
      setFollowingCount(snapshot.size);
    } catch (error) {
      console.error('Error fetching following:', error);
    }
  };

  useEffect(() => {
    const uid = auth().currentUser.uid;
    fetchPostCount(uid);
    fetchCurrentUserPosts();
    fetchFollowersCount(uid);
    fetchFollowingCount(uid);
  }, []);

  const renderUserPosts = ({ item }) => {
    return (
      <TouchableOpacity style={styles.singlePostingContainer}>
        <Image source={{ uri: item.postImage }} style={styles.singlePosting} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <MainHeader ProfileScreen={true} userName={user.username} />

      <View style={styles.headerContainer}>
        <Image
          style={styles.img}
          source={{
            uri: user.photoUrl,
          }}
        />

        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            {postCount !== null && <Text>{postCount}</Text>}
          </Text>
          <Text style={styles.text}>Posts</Text>
        </View>

        <TouchableOpacity style={styles.innerContainer}>
          <Text style={styles.text}>{followersCount}</Text>
          <Text style={styles.text}>Followers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.innerContainer}>
          <Text style={styles.text}>{followingCount}</Text>
          <Text style={styles.text}>Following</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>{user.username}</Text>
        <Text style={styles.userInfoText}>Bio........</Text>
      </View>

      <View style={styles.btnMainContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Setting')}
          style={styles.btnContainer}
        >
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnText}>Share Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="person-add" size={21} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.userPostContainer}>
        <FlatList
          numColumns={2}
          key={2}
          data={loggedUserPosts}
          keyExtractor={item => item.id}
          renderItem={renderUserPosts}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: hp('1.5%'),
  },
  img: {
    width: wp('24%'),
    height: wp('24%'),
    borderRadius: wp('12%'),
    borderWidth: 2,
    borderColor: 'silver',
  },
  innerContainer: {
    padding: wp('1%'),
  },
  text: {
    textAlign: 'center',
    fontSize: wp('4%'),
    fontFamily: 'Roboto-Bold',
  },
  userInfoContainer: {
    marginHorizontal: wp('4%'),
    marginTop: 3,
  },
  userInfoText: {
    fontSize: wp('3.7%'),
    fontFamily: 'Roboto-Regular',
  },
  btnMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('2%'),
  },
  btnContainer: {
    width: wp('42%'),
    padding: wp('2%'),
    borderRadius: wp('2%'),
    backgroundColor: '#484849ff',
  },
  btnText: {
    textAlign: 'center',
    fontSize: wp('4%'),
    fontFamily: 'Roboto-Bold',
    color: 'white',
  },
  iconContainer: {
    backgroundColor: '#484849ff',
    borderRadius: wp('2%'),
    width: wp('9%'),
    height: wp('9%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPostContainer: {
    marginHorizontal: wp('2%'),
    marginTop: hp('1%'),
  },
  singlePostingContainer: {
    marginRight: wp('2%'),
  },
  singlePosting: {
    width: wp('30%'),
    height: wp('40%'),
    borderRadius: wp('1%'),
  },
});

//make this component available to the app
export default MyProfileScreen;
