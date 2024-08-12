import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
} from "react-native";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Financeiro from "../screens/Financeiro";
import Agenda from "../screens/Agenda";
import Cliente from "../screens/Cliente/Cliente";
import Consultor from "../screens/Consultor";
import CustomDrawer from "./CustomDrawer";
import CustomHeader from "./CustomHearder";
import {
  Home2,
  House,
  Routing,
  Calendar,
  CardPos,
  More,
} from "iconsax-react-native";
import Propriedades from "../screens/Propriedades/Propriedades";
import Eventos from "../screens/Eventos";
import Visitas from "../screens/Visitas/Visitas";

type BottomTabNavigation = {
  Propriedades: undefined;
  Visitas: { selectedFazenda?: number };
};

export type BottomTabsTypes = BottomTabNavigationProp<BottomTabNavigation> 

const Tab = createBottomTabNavigator();

const handleIcon = (label: string, focused: boolean, color: string) => {
  switch (label) {
    case "Propriedades":
      return (
        <View
          style={{
            backgroundColor: focused ? "white" : "transparent",
            borderRadius: 12,
            padding: 4,
            paddingHorizontal: 16,
          }}
        >
          <House size="24" color={focused ? "#8B0000" : color} />
        </View>
      );
    case "Home":
      return (
        <View
          style={{
            backgroundColor: focused ? "white" : "transparent",
            borderRadius: 12,
            padding: 4,
            paddingHorizontal: 16,
          }}
        >
          <Home2 size="24" color={focused ? "#8B0000" : color} />
        </View>
      );
    case "Visitas":
      return (
        <View
          style={{
            backgroundColor: focused ? "white" : "transparent",
            borderRadius: 12,
            padding: 4,
            paddingHorizontal: 16,
          }}
        >
          <Routing size="24" color={focused ? "#8B0000" : color} />
        </View>
      );
    case "Financeiro":
      return (
        <View
          style={{
            backgroundColor: focused ? "white" : "transparent",
            borderRadius: 12,
            padding: 4,
            paddingHorizontal: 16,
          }}
        >
          <CardPos size={24} color={focused ? "#8B0000" : color} />
        </View>
      );
    case "Agenda":
      return (
        <View
          style={{
            backgroundColor: focused ? "white" : "transparent",
            borderRadius: 12,
            padding: 4,
            paddingHorizontal: 16,
          }}
        >
          <Calendar size={24} color={focused ? "#8B0000" : color} />
        </View>
      );
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
            header: () => (
              <CustomHeader
                setCardVisible={setCardVisible}
                cardVisible={cardVisible}
              />
            ),
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "white",
            tabBarStyle: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              position: "absolute",
              backgroundColor: "#8B0000",
              height: Platform.OS === "ios" ? 90 : 60,
              overflow: "hidden",
              bottom: 0,
              left: 0,
              right: 0,
            },
            tabBarItemStyle: {
              borderRadius: 16,
              gap: 5,
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ focused, color }) =>
                handleIcon("Home", focused, color),
            }}
          />
          <Tab.Screen
            name="Propriedades"
            component={Propriedades}
            options={{
              tabBarIcon: ({ focused, color }) =>
                handleIcon("Propriedades", focused, color),
            }}
          />
          <Tab.Screen
            name="Visitas"
            component={Visitas}
            options={{
              tabBarIcon: ({ focused, color }) =>
                handleIcon("Visitas", focused, color),
            }}
          />
          <Tab.Screen
            name="Agenda"
            component={Agenda}
            options={{
              tabBarIcon: ({ focused, color }) =>
                handleIcon("Agenda", focused, color),
            }}
          />
          <Tab.Screen
            name="Financeiro"
            component={Financeiro}
            options={{
              tabBarIcon: ({ focused, color }) =>
                handleIcon("Financeiro", focused, color),
            }}
          />
          <Tab.Screen
            name="Mais"
            component={View}
            options={{
              tabBarButton: () => (
                <TouchableOpacity
                  style={{
                    marginVertical: "auto",
                    backgroundColor: "#8B0000",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: 20,
                    paddingLeft: 10,
                    gap: 15,
                  }}
                  onPress={toggleDrawer}
                >
                  <More style={{ marginTop: 8 }} size={24} color="white" />
                  <Text style={{ color: "white", fontSize: 10 }}>Mais</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Cliente"
            component={Cliente}
            options={{ tabBarButton: () => null, headerShown: false }}
          />
          <Tab.Screen
            name="Consultor"
            component={Consultor}
            options={{ tabBarButton: () => null }}
          />
          <Tab.Screen
            name="Eventos"
            component={Eventos}
            options={{ tabBarButton: () => null }}
          />
        </Tab.Navigator>
        {drawerVisible && (
          <CustomDrawer closeDrawer={toggleDrawer} navigation={navigation} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BottomTabs;
