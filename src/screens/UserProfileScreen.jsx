//import liraries
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainHeader from '../components/MainHeader';
import { PostsContext } from '../context/PostsContext';
import CustomButton from '../components/CustomButton';

const UserProfileScreen = ({ navigation, route }) => {
  const { userId } = route.params || {};
  const [user, setUser] = useState(null);
  const { posts } = useContext(PostsContext);
  const [userPosts, setUserPosts] = useState(null);
  const [postCount, setPostCount] = useState(null);
  const [followToggle, setFollowToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    // Fetch user data
    const unsubscribeUser = firestore()
      .collection('allusers')
      .doc(userId)
      .onSnapshot(doc => {
        if (doc.exists) {
          setUser(doc.data());
        } else {
          setUser(null);
        }
        setLoading(false);
      });

    return () => {
      unsubscribeUser();
    };
  }, [userId]);

  //will fetch number of posts a user has done
  const fetchPostCount = async uid => {
    try {
      const snapshot = await firestore()
        .collection('Posts')
        .where('userId', '==', uid)
        .get();

      setPostCount(snapshot.size);
    } catch (error) {
      console.error('Error fetching posts length:', error);
      return null;
    }
  };

  //actually fetching the posts data
  const fetchCurrentUserPosts = () => {
    const userPosts = posts.filter(post => post.userId == userId);
    setUserPosts(userPosts);
    console.log('posts: ', userPosts);
  };

  useEffect(() => {
    fetchCurrentUserPosts();
    fetchPostCount(userId);
  }, []);

  const renderUserPosts = ({ item }) => (
    <TouchableOpacity style={styles.singlePostingContainer}>
      <Image source={{ uri: item.postImage }} style={styles.singlePosting} />
      {/* <Text>Hi</Text> */}
    </TouchableOpacity>
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="crimson" />
      </View>
    );
  }

  // No user found
  if (!user) {
    return (
      <View style={styles.center}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MainHeader ProfileScreen={true} userName={user.username || 'Unknown'} />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          style={styles.img}
          source={{
            uri: user.photoUrl || 'https://via.placeholder.com/150', // fallback dp
          }}
        />

        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            {postCount !== null && <Text>{postCount}</Text>}
          </Text>
          <Text style={styles.text}>Posts</Text>
        </View>
        <TouchableOpacity style={styles.innerContainer}>
          <Text style={styles.text}>{user.followers || 0}</Text>
          <Text style={styles.text}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerContainer}>
          <Text style={styles.text}>{user.following || 0}</Text>
          <Text style={styles.text}>Following</Text>
        </TouchableOpacity>
      </View>

      {/* User info */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>{user.username || 'No Name'}</Text>
        <Text style={styles.userInfoText}>{user.bio || 'Bio...'}</Text>
      </View>

      <CustomButton
        style={[
          followToggle && { backgroundColor: '#484849ff' },
          { marginHorizontal: 5, marginVertical: 5 },
        ]}
        title={!followToggle ? 'Follow' : 'Unfollow'}
        onPress={() => setFollowToggle(!followToggle)}
      />

      {/* Posts */}
      <View style={styles.userPostContainer}>
        <FlatList
          numColumns={2}
          data={userPosts}
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
    borderRadius: wp('2%'),
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default UserProfileScreen;
