//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// create a component
const MainHeader = ({
  ProfileScreen,
  HomeScreen,
  userName,
  onPressForYou,
  onPressFollowing,
  onPressHeartIcon,
  onPressChat,
  onPressUserName,
  onPressAddPost,
  onPressBars,
}) => {
  return (
    <View style={styles.container}>
      {HomeScreen && (
        <>
          <View style={styles.innerContainer}>
            <TouchableOpacity onPress={onPressForYou}>
              <Text style={styles.forYouText}>For you</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressFollowing}>
              <Text style={styles.followingText}>Following</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.innerContainer}>
            <TouchableOpacity onPress={onPressHeartIcon}>
              <AntDesign
                name="hearto"
                size={27}
                color="black"
                style={{ marginRight: 13 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressChat}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={29}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </>
      )}

      {ProfileScreen && (
        <>
          <View style={styles.innerContainer}>
            <TouchableOpacity
              style={styles.userNameContainer}
              onPress={onPressUserName}
            >
              <Text style={styles.userNameText}>{userName}</Text>
              <Ionicons name="chevron-down-sharp" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.innerContainer}>
            <TouchableOpacity onPress={onPressAddPost}>
              <MaterialIcons
                name="add-box"
                size={34}
                color="#484849ff"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressBars}>
              <Ionicons name="reorder-four-outline" size={34} color="black" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: wp('100%'),
    height: hp('6%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    // backgroundColor: 'yellow',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forYouText: {
    fontSize: wp('5.7%'),
    fontFamily: 'Roboto-Bold',
    marginRight: 12,
  },
  userNameText: {
    fontSize: wp('5.2%'),
    fontFamily: 'Roboto-Bold',
    marginRight: 3,
  },
  followingText: {
    fontSize: wp('5.5%'),
    fontFamily: 'Roboto-Bold',
    color: 'gray',
  },
  headerText: {
    fontSize: wp('5.2%'),
    fontFamily: 'Roboto-Bold',
  },
});

//make this component available to the app
export default MainHeader;
