//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Search Screen</Text>
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
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 27,
  },
});

//make this component available to the app
export default SearchScreen;
