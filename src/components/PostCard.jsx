// InstagramPostCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const PostCard = ({
  item,
  // userImage,
  // username,
  // time,
  // postImage,
  // description,
  likes,
  // comments = 5,
  // shares = 2,
  onPressMore,
  onPressLike,
  isLiked,
  onPressComment,
  onPressShare,
  onPressSave,
  onPressProfileName,
}) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={onPressProfileName}>
            <Image source={{ uri: item.userImage }} style={styles.userImage} />
          </TouchableOpacity>
          <View>
            <TouchableOpacity onPress={onPressProfileName}>
              <Text style={styles.username}>{item.username}</Text>
            </TouchableOpacity>

            <Text style={styles.time}>Just Now</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onPressMore}>
          <Feather name="more-vertical" size={20} />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image
        source={{
          uri: item.postImage,
        }}
        style={styles.postImage}
        resizeMode="cover"
      />

      {/* Description */}
      <Text style={styles.description}>{item.description}</Text>

      {/* Like, Comment, Share Buttons with Counts */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={onPressLike} style={styles.actionBtn}>
            <Entypo
              name={isLiked ? 'heart' : 'heart-outlined'}
              size={26}
              color={isLiked ? 'red' : 'black'}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{likes}</Text>

          <TouchableOpacity onPress={onPressComment} style={styles.actionBtn}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.count}>{item.comments}</Text>

          <TouchableOpacity onPress={onPressShare} style={styles.actionBtn}>
            <Feather name="send" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.count}>{item.shares}</Text>
        </View>

        <TouchableOpacity onPress={onPressSave}>
          <Feather name="bookmark" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffffff',
    marginTop: hp('1%'),
    paddingBottom: hp('1%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    marginRight: wp('2%'),
  },
  username: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp('4%'),
    textTransform: 'capitalize',
  },
  time: {
    fontSize: wp('3%'),
    fontFamily: 'Roboto-Regular',
    color: 'gray',
  },
  postImage: {
    alignSelf: 'center',
    borderRadius: wp('5%'),
    width: wp('100%'),
    height: undefined,
    aspectRatio: 16 / 9,
  },
  description: {
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('0.5%'),
    fontSize: wp('3.5%'),
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    paddingTop: hp('0.3%'),
    alignItems: 'center',
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    marginRight: wp('1.5%'),
  },
  count: {
    marginRight: wp('3%'),
    fontSize: wp('3.6%'),
    color: 'black',
    alignSelf: 'center',
  },
});

export default PostCard;
