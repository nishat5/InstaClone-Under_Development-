//import liraries
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import MainHeader from '../components/MainHeader';
import PostCard from '../components/PostCard';
import StoryCard from '../components/StoryCard';
import { PostsContext } from '../context/PostsContext';

// create a component
const HomeScreen = ({ navigation }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const { posts } = useContext(PostsContext);

  //FETCHES ALL USERS EXCEPT THE LOGGED IN USERS, USING WHERE METHOD OF FIREBASE
  useEffect(() => {
    setLoading(true);
    const userId = auth().currentUser?.uid;
    const unsubscribe = firestore()
      .collection('allusers')
      .where('userId', '!=', userId)
      .onSnapshot(snapshot => {
        const allUsers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(allUsers);
        setLoading(false);
        // console.log(allUsers);
      });

    return () => unsubscribe();
  }, []);

  //set liked post count in firestore
  const likedHandler = async postId => {
    const currentUserId = auth().currentUser.uid;
    const postRef = firestore().collection('Posts').doc(postId);

    const postSnap = await postRef.get();
    if (!postSnap.exists) return;

    const postData = postSnap.data();
    const likedBy = postData.likedBy || []; //setting up a filed name likeddBy in posts object

    if (likedBy.includes(currentUserId)) {
      // Unlike
      await postRef.update({
        likedBy: firestore.FieldValue.arrayRemove(currentUserId),
        likes: firestore.FieldValue.increment(-1), //if user unlike post, will likes Value -1
      });
    } else {
      // Like
      await postRef.update({
        likedBy: firestore.FieldValue.arrayUnion(currentUserId),
        likes: firestore.FieldValue.increment(1),
      });
    }
  };

  const renderStoryItems = ({ item }) => {
    return <StoryCard item={item} />;
  };

  const renderPostItems = ({ item }) => {
    const currentUserId = auth().currentUser.uid;
    const isLiked = item.likedBy?.includes(currentUserId); //Output: True/False
    return (
      <PostCard
        item={item}
        isLiked={isLiked}
        likes={item.likes || 0}
        onPressLike={() => likedHandler(item.id)}
        onPressProfileName={() =>
          currentUserId !== item.userId
            ? navigation.navigate('UserProfile', {
                userId: item.userId,
              })
            : navigation.navigate('MyProfile')
        }
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color="crimson" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MainHeader HomeScreen={true} />
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderPostItems}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          //Flatlist of users stories etc
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={users}
            keyExtractor={item => item.id}
            renderItem={renderStoryItems}
            style={{ marginBottom: 10 }}
          />
        )}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('3%'),
    backgroundColor: 'white',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default HomeScreen;
