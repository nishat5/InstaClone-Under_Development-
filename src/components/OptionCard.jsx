//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// create a component
const OptionCard = ({ iconType, iconName, optionName }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <TouchableOpacity>
        {iconType === 'Ionicons' && (
          <Ionicons name={iconName} size={20} color="black" />
        )}
        {iconType === 'MaterialIcons' && (
          <MaterialIcons name={iconName} size={20} color="black" />
        )}
      </TouchableOpacity>

      <View style={styles.optionContainer}>
        <Text style={styles.optionName}>{optionName}</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: wp('15%'),
    padding: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'silver',
  },

  optionContainer: {
    flex: 1,
    paddingHorizontal: wp('4%'),
  },
  optionName: {
    fontSize: wp('4%'),
    fontFamily: 'Roboto-Bold',
  },
});

//make this component available to the app
export default OptionCard;
