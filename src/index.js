import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SafeAreaView } from 'react-native';
import { Login, Home, Emails } from 'pages';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const Logged = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => <Icon name="email" />,
          }}
        />
        <Tab.Screen
          name="Emails"
          component={Emails}
          options={{
            tabBarIcon: () => <Icon name="repeat" />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const App = () => {
  const Stack = createStackNavigator();
  const safeAreaViewStyle = { flexGrow: 1, backgroundColor: 'white' };

  return (
    <>
      <SafeAreaView style={safeAreaViewStyle}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            transparentCard
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="Logged"
              component={Logged}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default App;
