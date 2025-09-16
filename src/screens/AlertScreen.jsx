//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const AlertScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Alerts & Notificaitons</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: { fontSize: 24, fontFamily: 'Roboto-Bold' },
});

//make this component available to the app
export default AlertScreen;
