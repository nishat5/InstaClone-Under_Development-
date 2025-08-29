//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import UserCard from '../components/UserCard';
import OptionCard from '../components/OptionCard';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AntDesign from 'react-native-vector-icons/AntDesign';

// create a component
const SettingScreen = ({ navigation }) => {
  const headerBtnHandler = () => {
    navigation.navigate('Home');
  };
  const userCardHandler = () => {
    navigation.navigate('ProfileScreen');
  };
  return (
    <View style={styles.container}>
      <Header
        heading="Setting and Profile"
        onPress={headerBtnHandler}
        settingHeader={true}
      />
      <View style={styles.settingWrapper}>
        <UserCard onPress={userCardHandler} />
        <OptionCard
          iconType="Ionicons"
          iconName="bookmark-outline"
          optionName="Saved"
        />
        <OptionCard
          iconType="Ionicons"
          iconName="cash-outline"
          optionName="Coupon History"
        />
        <OptionCard
          iconType="MaterialIcons"
          iconName="headphones"
          optionName="Support"
        />
        <OptionCard
          iconType="MaterialIcons"
          iconName="file-present"
          optionName="Terms & Conditions"
        />
        <TouchableOpacity style={styles.logoutBtnContainer}>
          <AntDesign name="logout" size={20} color="red" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  settingWrapper: {
    paddingHorizontal: wp('3%'),
    marginTop: hp('1.5%'),
  },
  logoutBtnContainer: {
    marginTop: hp('1%'),
    padding: wp('3.5%'),
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  logoutText: {
    paddingHorizontal: wp('4%'),
    color: 'red',
    fontSize: wp('4%'),
    fontFamily: 'Roboto-Bold',
  },
});

//make this component available to the app
export default SettingScreen;
