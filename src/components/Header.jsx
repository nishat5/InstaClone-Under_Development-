//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
// create a component
const Header = ({ onPress, heading, sideTitle, settingHeader }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="chevron-back" size={22} color="black" />
      </TouchableOpacity>

      <Text style={styles.headerText}>{heading}</Text>
      {settingHeader ? (
        <Text></Text>
      ) : (
        <TouchableOpacity>
          <Text style={styles.headerText}>{sideTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp('2%'),
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: wp('5%'),
    fontFamily: 'Roboto-Bold',
  },
});

//make this component available to the app
export default Header;
