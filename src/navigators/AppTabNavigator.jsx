import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'; // MaterialCommunityIcons
import UserNavigator from '../navigators/UserNavigator';
import AlertScreen from '../screens/AlertScreen';
import SearchScreen from '../screens/SearchScreen';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const COLORS = {
  bg: '#0f172a', // tab bar background (slate-900)
  pill: '#111827', // inner pill color (gray-900)
  active: '#d45d48ff',
  inactive: 'white',
  white: '#fff',
};

function AddScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Create</Text>
    </View>
  );
}

// Big center button
function CenterButton({ children, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.centerBtnWrap}
    >
      <View style={styles.centerBtn}>{children}</View>
    </TouchableOpacity>
  );
}

const AppTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabelStyle: {
            fontSize: 13,
            fontFamily: 'Roboto-Regular',
          },
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: COLORS.active,
          tabBarInactiveTintColor: COLORS.bg,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Octicons
                name={focused ? 'home' : 'home'}
                color={color}
                size={28}
              />
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

        {/* Center action */}
        <Tab.Screen
          name="Create"
          component={AddScreen}
          options={{
            tabBarLabel: () => null, //remove only label under tab +
            tabBarIcon: ({ focused }) => (
              <MCIcon
                name={focused ? 'plus' : 'plus'}
                color="white"
                size={28}
              />
            ),
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
            // Example badge:
            tabBarBadge: 1,
            tabBarBadgeStyle: {
              backgroundColor: COLORS.active,
              color: COLORS.bg,
              top: 2,
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={UserNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="person-outline" color={color} size={28} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: 'black', fontSize: 22, fontWeight: '700' },

  tabBar: {
    // position: 'absolute',
    left: 5,
    right: 5,
    bottom: 0,
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    // borderRadius: 24,
    paddingHorizontal: 5,
    paddingBottom: 5,
    paddingTop: 5,
  },

  centerBtnWrap: {
    // top: -22, // raises the button
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  centerBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.active,
  },
});

export default AppTabNavigator;
