import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'react-native';
import LoginScreen from '../screens/Login/LoginScreen';

const Stack = createNativeStackNavigator();

const Router = () => {
  const { authState, onLogout } = useAuth();

  return (
    <Stack.Navigator>
      {authState?.authenticated ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <Button onPress={onLogout} title="Sign Out" />
            ),
          }}
        />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
      )}
    </Stack.Navigator>
  );
};

export default Router;
