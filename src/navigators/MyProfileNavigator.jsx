// import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ProfileScreen from '../screens/ProfileScreen';
// import SettingScreen from '../screens/SettingScreen';
// import MyProfileScreen from '../screens/MyProfileScreen';
// // import UserProfileScreen from '../screens/UserProfileScreen';

// const Stack = createNativeStackNavigator();

// const MyProfileNavigator = () => {
//   return (
//     // <NavigationContainer>
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         animation: 'fade_from_bottom',
//       }}
//     >
//       <Stack.Screen name="MyProfile" component={MyProfileScreen} />
//       <Stack.Screen name="Setting" component={SettingScreen} />
//       <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//       {/* <Stack.Screen name="UserProfile" component={UserProfileScreen} /> */}
//     </Stack.Navigator>
//     // </NavigationContainer>
//   );
// };

// export default MyProfileNavigator;

// MyProfileNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyProfileScreen from '../screens/MyProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const MyProfileNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
  >
    <Stack.Screen name="MyProfile" component={MyProfileScreen} />
    <Stack.Screen name="Setting" component={SettingScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
  </Stack.Navigator>
);

export default MyProfileNavigator;
