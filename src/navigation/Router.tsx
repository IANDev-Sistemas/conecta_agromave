import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/Login/LoginScreen';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

const Router = () => {
  const { authState } = useAuth();

  return (
    <Stack.Navigator>
      {authState?.authenticated ? (
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{headerShown:false}}
        />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
      )}
    </Stack.Navigator>
  );
};

export default Router;
