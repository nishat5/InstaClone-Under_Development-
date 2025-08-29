//import liraries
import React, { Component, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppTabNavigator from './src/navigators/AppTabNavigator';
// import UserNavigator from './src/components/navigators/UserNavigator';
// import ResponsiveUI from './src/components/ResponsiveUI';
// import CameraGallery from './src/components/CameraGallery';
// import PermissionsHandling from './src/components/PermissionsHandling';
// import TodoApp from './TodoAPP/TodoApp';
// import UseMemo from './src/components/UseMemo';

// create a component
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent={false}
          backgroundColor="white"
        />
        {/* <TodoApp /> */}
        {/* <UseMemo /> */}
        {/* <PermissionsHandling /> */}
        {/* <CameraGallery /> */}
        {/* <ResponsiveUI /> */}
        {/* <UserNavigator /> */}
        {/* <UserNavigator /> */}
        <AppTabNavigator />
        {/* <Text style={{ fontSize: 36, marginTop: 20, fontFamily: 'Roboto-Bold' }}>
        Hello World
      </Text>
      <Icon name="rocket" size={30} color="#900" /> */}
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default App;
