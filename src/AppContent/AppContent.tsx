//import liraries
import React, { useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigator from '../navigators/AuthNavigator';
import { AuthContext } from '../context/AuthContext';
import AppTabNavigator from '../navigators/AppTabNavigator';

// create a component
const AppContent = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const { user, role } = useContext(AuthContext);

  //on first render, if both user and role are null then it will show activity indicator
  //this will avoid me from showing flicker of userNavigator on admin login
  //   if (user === null) {
  //     return (
  //       <View style={styles.container}>
  //         <StatusBar
  //           barStyle={'dark-content'}
  //           backgroundColor="#f3eaeaff"
  //           hidden={false}
  //           translucent={true}
  //         />
  //         <ActivityIndicator
  //           color="#f33716ff"
  //           size="large"
  //           style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  //         />
  //       </View>
  //     );
  //   }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent={false}
          backgroundColor="white"
        />

        {/* {user && user.emailVerified ? <AppTabNavigator /> : <AuthNavigator />} */}
        {user ? <AppTabNavigator /> : <AuthNavigator />}
        {/* <AppTabNavigator /> */}
        {/* <AuthNavigator /> */}
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
export default AppContent;
