import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import { Login } from 'pages';

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
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default App;
