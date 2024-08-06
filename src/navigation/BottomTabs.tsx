import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Platform, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Financeiro from '../screens/Financeiro';
import Agenda from '../screens/Agenda';
import Clientes from '../screens/Clientes';
import Consultor from '../screens/Consultor';
import Visitas from '../screens/Visitas';
import Servicos from '../screens/Servicos';
import { Entypo } from '@expo/vector-icons';
import CustomDrawer from './CustomDrawer';
import CustomHeader from './CustomHearder';

const Tab = createBottomTabNavigator();
const statusBarHeight = Platform.OS === 'ios' ? 50 : Constants.statusBarHeight + 10;

const handleIcon = (label: string, focused: boolean, color: string) => {
  switch (label) {
    case 'Home':
      return <Entypo name="home" size={24} color={focused ? '#8B0000' : color} />;
    case 'Financeiro':
      return <MaterialIcons name="attach-money" size={24} color={focused ? '#8B0000' : color} />;
    case 'Agenda':
      return <Entypo name="calendar" size={24} color={focused ? '#8B0000' : color} />;
    default:
      return null;
  }
};

const BottomTabs = ({ navigation }: any) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  const handleOutsidePress = () => {
    if (cardVisible) setCardVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            header: () => <CustomHeader setCardVisible={setCardVisible} cardVisible={cardVisible} />,
            tabBarActiveTintColor: '#8B0000',
            tabBarInactiveTintColor: 'white',
            tabBarActiveBackgroundColor: 'white',
            tabBarInactiveBackgroundColor: '#8B0000',
            tabBarStyle: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              position: 'absolute',
              backgroundColor: '#8B0000',
              height: Platform.OS === 'ios' ? 80 : 60,
              overflow: 'hidden',
              bottom: 0,
              left: 0,
              right: 0,
            },
            tabBarItemStyle: {
              borderRadius: 16,
              margin: 5,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ focused, color }) => handleIcon('Home', focused, color),
            }}
          />
          <Tab.Screen
            name="Financeiro"
            component={Financeiro}
            options={{
              tabBarIcon: ({ focused, color }) => handleIcon('Financeiro', focused, color),
            }}
          />
          <Tab.Screen
            name="Agenda"
            component={Agenda}
            options={{
              tabBarIcon: ({ focused, color }) => handleIcon('Agenda', focused, color),
            }}
          />
          <Tab.Screen
            name="Mais"
            component={View}
            options={{
              tabBarButton: () => (
                <TouchableOpacity
                  style={{
                    marginVertical: 'auto',
                    backgroundColor: '#8B0000',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: 30,
                    paddingLeft: 30,
                  }}
                  onPress={toggleDrawer}
                >
                  <Entypo name="dots-three-horizontal" style={{ marginTop: 5 }} size={24} color="white" />
                  <Text style={{ color: 'white', fontSize: 10 }}>Mais</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Clientes"
            component={Clientes}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Consultor"
            component={Consultor}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Visitas"
            component={Visitas}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Servicos"
            component={Servicos}
            options={{ tabBarButton: () => null }}
          />
        </Tab.Navigator>
        {drawerVisible && <CustomDrawer closeDrawer={toggleDrawer} navigation={navigation} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BottomTabs;