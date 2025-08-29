//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const AlertScreen = () => {
  return (
    <View style={styles.container}>
      <Text>AlertScreen</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
  },
});

//make this component available to the app
export default AlertScreen;
