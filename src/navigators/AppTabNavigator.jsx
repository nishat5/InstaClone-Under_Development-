// import React, { useContext } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'; // MaterialCommunityIcons

// import AlertScreen from '../screens/AlertScreen';
// import SearchScreen from '../screens/SearchScreen';
// import HomeScreen from '../screens/HomeScreen';
// import AddPostScreen from '../screens/AddPostScreen';
// import { UserContext } from '../context/UserContext';
// import MyProfileNavigator from './MyProfileNavigator';

// const Tab = createBottomTabNavigator();

// const COLORS = {
//   bg: '#0f172a', // tab bar background (slate-900)
//   pill: '#111827', // inner pill color (gray-900)
//   active: '#d45d48ff',
//   inactive: 'white',
//   white: '#fff',
// };

// // Big center button
// function CenterButton({ children, onPress }) {
//   return (
//     <TouchableOpacity
//       activeOpacity={0.85}
//       onPress={onPress}
//       style={styles.centerBtnWrap}
//     >
//       <View style={styles.centerBtn}>{children}</View>
//     </TouchableOpacity>
//   );
// }

// const AppTabNavigator = () => {
//   // const { user } = useContext(UserContext);
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           headerShown: false,
//           tabBarShowLabel: false,
//           tabBarLabelStyle: {
//             fontSize: 13,
//             fontFamily: 'Roboto-Regular',
//           },
//           tabBarStyle: styles.tabBar,
//           tabBarActiveTintColor: COLORS.active,
//           tabBarInactiveTintColor: COLORS.bg,
//         }}
//       >
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBarIcon: ({ color, size, focused }) => (
//               <Octicons
//                 name={focused ? 'home' : 'home'}
//                 color={color}
//                 size={28}
//               />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Search"
//           component={SearchScreen}
//           options={{
//             tabBarIcon: ({ color }) => (
//               <Icon name="search" color={color} size={28} />
//             ),
//           }}
//         />

//         {/* Center action */}
//         <Tab.Screen
//           name="Create"
//           component={AddPostScreen}
//           options={{
//             tabBarLabel: () => null, //remove only label under tab +
//             tabBarIcon: ({ focused }) => (
//               <MCIcon
//                 name={focused ? 'plus' : 'plus'}
//                 color="white"
//                 size={28}
//               />
//             ),
//             tabBarButton: props => <CenterButton {...props} />,
//           }}
//         />

//         <Tab.Screen
//           name="Alerts"
//           component={AlertScreen}
//           options={{
//             tabBarIcon: ({ color }) => (
//               <Icon name="notifications-outline" color={color} size={28} />
//             ),
//             // Example badge:
//             tabBarBadge: 1,
//             tabBarBadgeStyle: {
//               backgroundColor: COLORS.active,
//               color: '#fff',
//               top: 2,
//             },
//           }}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={MyProfileNavigator}
//           options={{
//             tabBarIcon: ({ color }) => (
//               <Icon name="person-outline" color={color} size={28} />
//               // <Image
//               //   style={styles.profileImg}
//               //   source={{ uri: user.photoUrl }}
//               // />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: { color: 'black', fontSize: 22, fontWeight: '700' },

//   tabBar: {
//     // position: 'absolute',
//     left: 5,
//     right: 5,
//     bottom: 0,
//     height: 60,
//     backgroundColor: '#fff',
//     borderTopWidth: 0,
//     // borderRadius: 24,
//     paddingHorizontal: 5,
//     paddingBottom: 5,
//     paddingTop: 5,
//   },

//   centerBtnWrap: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 5,
//   },
//   centerBtn: {
//     width: 36,
//     height: 36,
//     borderRadius: 10,
//     backgroundColor: COLORS.active,
//   },
//   profileImg: {
//     width: wp('10%'),
//     height: wp('10%'),
//     borderRadius: wp('5%'),
//     borderWidth: 1,
//     borderColor: '#f9f9f9',
//   },
// });

// export default AppTabNavigator;

// AppTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import AddPostScreen from '../screens/AddPostScreen';
import AlertScreen from '../screens/AlertScreen';
import MyProfileNavigator from './MyProfileNavigator';

const Tab = createBottomTabNavigator();

const COLORS = {
  active: '#d45d48ff',
  bg: '#0f172a',
  white: '#fff',
};

const CenterButton = ({ children, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    style={styles.centerBtnWrap}
  >
    <View style={styles.centerBtn}>{children}</View>
  </TouchableOpacity>
);

const AppTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: COLORS.active,
      tabBarInactiveTintColor: COLORS.bg,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Octicons name="home" color={color} size={28} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="search" color={color} size={28} />
        ),
      }}
    />
    <Tab.Screen
      name="Create"
      component={AddPostScreen}
      options={{
        tabBarLabel: () => null,
        tabBarIcon: () => <MCIcon name="plus" color="white" size={28} />,
        tabBarButton: props => <CenterButton {...props} />,
      }}
    />
    <Tab.Screen
      name="Alerts"
      component={AlertScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="notifications-outline" color={color} size={28} />
        ),
        tabBarBadge: 1,
        tabBarBadgeStyle: {
          backgroundColor: COLORS.active,
          color: '#fff',
          top: 2,
        },
      }}
    />
    <Tab.Screen
      name="Profile"
      component={MyProfileNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="person-outline" color={color} size={28} />
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    left: 5,
    right: 5,
    bottom: 0,
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    paddingHorizontal: 5,
    paddingBottom: 5,
    paddingTop: 5,
  },
  centerBtnWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  centerBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.active,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppTabNavigator;
