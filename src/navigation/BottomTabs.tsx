import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
  Animated,
  PanResponder,
  GestureResponderEvent,
  Linking,
} from "react-native";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home/Home";
import AgendaScreen from "../screens/Agenda/AgendaScreen";
import Cliente from "../screens/Cliente/Cliente";
import CustomDrawer from "./CustomDrawer";
import CustomHeader from "./CustomHearder";
import {
  Home2,
  House,
  Routing,
  Calendar,
  CardPos,
  More,
  ShoppingBag,
  DocumentText1,
  ReceiptText,
  Whatsapp,
} from "iconsax-react-native";
import Propriedades from "../screens/Propriedades/Propriedades";
import Visitas from "../screens/Visitas/Visitas";
import Consultor from "../screens/Consultor/Consultor";
import Eventos from "../screens/Eventos/Eventos";
import Financeiro from "../screens/Financeiro/Financeiro";

type BottomTabNavigation = {
  Propriedades: undefined;
  Visitas: { selectedFazenda?: number };
  Consultor: { selectedFazenda?: number };
  Cliente: undefined;
  Financeiro: { content?: string };
  Pedidos: { content?: string };
  Contratos: { content?: string };
  Notas: { content?: string };
};

export type BottomTabsTypes = BottomTabNavigationProp<BottomTabNavigation>;

const Tab = createBottomTabNavigator();


interface FloatingButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // "Anexa" o valor atual ao deslocamento
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset(); // Reseta o deslocamento para evitar o retorno
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 80,
        right: 20,
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: "#007E34",
          borderRadius: 50,
          width: 60,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <Whatsapp color="white" size={32} />
      </TouchableOpacity>
    </Animated.View>
  );
};

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
          <House size="24" color={focused ? "#007E34" : color} />
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
          <Home2 size="24" color={focused ? "#007E34" : color} />
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
          <Routing size="24" color={focused ? "#007E34" : color} />
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
          <CardPos size={24} color={focused ? "#007E34" : color} />
        </View>
      );
    case "Pedidos":
      return (
        <View
          style={{
            backgroundColor: focused ? "white" : "transparent",
            borderRadius: 12,
            padding: 4,
            paddingHorizontal: 16,
          }}
        >
          <ShoppingBag size={24} color={focused ? "#007E34" : color} />
        </View>
      );
    case "Contratos":
      return (
        <View
          style={{
            backgroundColor: focused ? "white" : "transparent",
            borderRadius: 12,
            padding: 4,
            paddingHorizontal: 16,
          }}
        >
          <DocumentText1 size={24} color={focused ? "#007E34" : color} />
        </View>
      );
    case "Notas":
      return (
        <View
          style={{
            backgroundColor: focused ? "white" : "transparent",
            borderRadius: 12,
            padding: 4,
            paddingHorizontal: 16,
          }}
        >
          <ReceiptText size={24} color={focused ? "#007E34" : color} />
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
          <Calendar size={24} color={focused ? "#007E34" : color} />
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
              backgroundColor: "#007E34",
              height: Platform.OS === "ios" ? 90 : 60,
              overflow: "hidden",
              bottom: 0,
              left: 0,
              right: 0,
            },
            tabBarItemStyle: {
              borderRadius: 16,
              gap: 2,
            },
          }}
          initialRouteName="Home"
        >
        <Tab.Screen
            name="Pedidos"
            component={Financeiro}
            options={{
              tabBarIcon: ({ focused, color }) =>
                handleIcon("Pedidos", focused, color),
            }}
            initialParams={{content:"pedidos"}}
          />
          {/* <Tab.Screen
          name="Contratos"
          component={Contratos}
          options={{
            tabBarIcon: ({ focused, color }) =>
              handleIcon("Contratos", focused, color),
          }}
          initialParams={{content:"contratos"}}
        /> */}
          <Tab.Screen
            name="Financeiro"
            component={Financeiro}
            options={{
              tabBarIcon: ({ focused, color }) =>
                handleIcon("Financeiro", focused, color),
            }}
            initialParams={{content:"financeiro"}}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ focused, color }) =>
                handleIcon("Home", focused, color),
            }}
          />
          <Tab.Screen
            name="Notas"
            component={Financeiro}
            options={{
              tabBarIcon: ({ focused, color }) =>
                handleIcon("Notas", focused, color),
            }}
            initialParams={{content:"notas"}}
          />
          <Tab.Screen
            name="Mais"
            component={View}
            options={{
              tabBarButton: () => (
                <TouchableOpacity
                  style={{
                    marginVertical: "auto",
                    backgroundColor: "#007E34",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: 40,
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
            name="Agenda"
            component={AgendaScreen}
            options={{ tabBarButton: () => null}}
          />
          <Tab.Screen
            name="Propriedades"
            component={Propriedades}
            options={{ tabBarButton: () => null}}
          />
          <Tab.Screen
            name="Visitas"
            component={Visitas}
            options={{ tabBarButton: () => null}}
          />
          <Tab.Screen
            name="Cliente"
            component={Cliente}
            options={{ tabBarButton: () => null}}
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

        <FloatingButton onPress={() => Linking.openURL('https://wa.me/5508007300505')} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BottomTabs;
