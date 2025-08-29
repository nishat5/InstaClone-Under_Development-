//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// create a component
const StoryCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={{
            uri: item.imageUrl,
          }}
        />
      </View>
      <Text style={styles.userText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: hp('13%'),
    padding: wp('2%'),
  },
  imgContainer: {
    width: wp('19%'),
    height: wp('19%'),
    borderRadius: wp('9.5%'),
    borderWidth: 2,
    borderColor: '#d45d48ff',
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('8%'),
  },
  userText: {
    marginTop: hp('1%'),
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    fontSize: wp('4%'),
  },
});

//make this component available to the app
export default StoryCard;
