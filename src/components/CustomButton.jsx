import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomButton = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1f6feb',
    paddingVertical: hp('1.3%'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#a0a0a0',
  },
  text: {
    color: '#fff',
    fontSize: wp('4.5%'),
    fontFamily: 'Roboto-Bold',
  },
});

export default CustomButton;

// -----------------------------
// Example usage in parent:
// -----------------------------
// <CustomButton title="Click Me" onPress={() => console.log("Pressed")} />
// <CustomButton title="Disabled" disabled />
// <CustomButton title="Custom Style" style={{backgroundColor: 'green'}} textStyle={{fontSize: 20}} />
