//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// create a component
const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        heading="Profile"
        sideTitle="Edit"
        onPress={() => navigation.pop()}
      />
      <View style={styles.imgMainWrapper}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://pbs.twimg.com/media/DDEBiYqXoAAB_zi.jpg',
            }}
          />
        </View>
      </View>
      {/* userdetails name mobile location etc */}
      <View style={styles.userDetailContainer}>
        <View style={styles.userDetail}>
          <Text style={[styles.userText, { color: 'gray' }]}>Full Name</Text>
          <Text style={styles.userText}>Mike Williomson</Text>
        </View>
        <View style={styles.userDetail}>
          <Text style={[styles.userText, { color: 'gray' }]}>
            Mobile Number
          </Text>
          <Text style={styles.userText}>(917) 875-3889</Text>
        </View>
        <View style={styles.userDetail}>
          <Text style={[styles.userText, { color: 'gray' }]}>Location</Text>
          <Text style={styles.userText}>New York City</Text>
        </View>
        <View style={styles.userDetail}>
          <Text style={[styles.userText, { color: 'gray' }]}>Gender</Text>
          <Text style={styles.userText}>Male</Text>
        </View>
        <View style={styles.userDetail}>
          <Text style={[styles.userText, { color: 'gray' }]}>
            Date of Birth
          </Text>
          <Text style={styles.userText}>24/03/1996</Text>
        </View>
        <View style={[styles.userDetail, { borderBottomWidth: 0 }]}>
          <Text style={[styles.userText, { color: 'gray' }]}>Email</Text>
          <Text style={styles.userText}>m.williomson804@gmail.com</Text>
        </View>
      </View>
      {/* delete account container starts */}
      <View style={styles.deleteAccContainer}>
        <Text style={styles.deleteText}>Delete Account</Text>
        <Text style={styles.textDes}>
          You can reactivate your account within 40 days. So, after 40 days your
          account will automatically be deleted, permanently.
        </Text>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.btnText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
  imgMainWrapper: {
    backgroundColor: 'white',
    padding: wp('3%'),
    margin: hp('2%'),
    alignItems: 'center',
    borderRadius: hp('2%'),
  },
  imgContainer: {
    width: wp('24%'),
    height: wp('24%'),
    borderRadius: wp('12%'),
    borderWidth: 1.5,
    borderColor: 'red',
    overflow: 'hidden',
  },
  img: {
    width: wp('24%'),
    height: wp('24%'),
  },
  userDetailContainer: {
    marginHorizontal: hp('2%'),
    borderRadius: hp('2%'),
    backgroundColor: 'white',
  },
  userDetail: {
    padding: wp('3.8%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'silver',
  },
  userText: {
    fontSize: wp('3.8%'),
    fontFamily: 'Roboto-Regular',
  },
  deleteAccContainer: {
    margin: hp('2%'),
    borderRadius: hp('2%'),
    backgroundColor: 'white',
    padding: wp('3.8%'),
  },
  deleteText: {
    fontSize: wp('3.8%'),
    fontFamily: 'Roboto-Bold',
    marginBottom: hp('0.5%'),
  },
  textDes: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp('3.5%'),
  },
  btnContainer: {
    padding: wp('2%'),
    borderWidth: 1,
    marginTop: hp('1.5%'),
    borderRadius: wp('5%'),
  },
  btnText: {
    fontSize: wp('3.8%'),
    fontFamily: 'Roboto-Bold',
    alignSelf: 'center',
  },
});

//make this component available to the app
export default ProfileScreen;
