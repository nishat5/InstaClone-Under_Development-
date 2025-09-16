//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
const UserCard = ({ onPress, user }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={{
            // uri: 'https://pbs.twimg.com/media/DDEBiYqXoAAB_zi.jpg',
            uri: user.photoUrl,
          }}
        />
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{user.username}</Text>
        <Text style={styles.userGmail}>{user.email}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: wp('19%'),
    backgroundColor: '#484849ff',
    borderRadius: wp('1.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
    padding: wp('3%'),
  },
  imgContainer: {
    width: wp('13%'),
    height: wp('13%'),
    borderRadius: wp('6.5%'),
    borderWidth: 1.5,
    borderColor: 'white',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  img: {
    width: wp('13%'),
    height: wp('13%'),
    borderRadius: wp('6.5%'),
  },
  userInfoContainer: {
    flex: 1,
    paddingHorizontal: wp('2%'),
  },
  userName: {
    fontSize: wp('4%'),
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
  userGmail: {
    fontSize: wp('3.5%'),
    color: 'white',
    fontFamily: 'Roboto-Regular',
  },
});

//make this component available to the app
export default UserCard;
