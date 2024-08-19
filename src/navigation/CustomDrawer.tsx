import React, { useEffect, useRef } from "react";
import { Animated, Easing, Platform, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import Constants from "expo-constants";
import { Divider } from "@rneui/themed";
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Calendar, CardPos, House, Logout, LogoutCurve, Profile2User, ProfileCircle, Routing, SmsNotification, TicketStar } from "iconsax-react-native";

const statusBarHeight = Platform.OS === "ios" ? 50 : Constants.statusBarHeight+20;

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  route: string;
  currentRoute: string | null;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, route, currentRoute, onPress }) => {
  const isActive = currentRoute === route;
  const iconColor = isActive ? "white" : "#023A5D";
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        backgroundColor: isActive ? "#023A5D" : "transparent",
        borderRadius: 16,
        padding: 10,
      }}

    >
      {React.cloneElement(icon as React.ReactElement, { color: iconColor })}
        <Text style={{color: isActive ? 'white' : "#49454F"}} className='my-2  font-bold'>{label}</Text>
    </TouchableOpacity>
  );
};

interface CustomDrawerProps {
  closeDrawer: () => void;
  navigation: DrawerNavigationProp<any>;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ closeDrawer, navigation }) => {
  const animationValue = useRef(new Animated.Value(500)).current;
  const { onLogout } = useAuth();
  
  const navigationState = useNavigationState(state => state);
  const currentRoute = navigationState.routes[navigationState.index];
  
  const currentRouteIndex = currentRoute?.state?.index;
  const currentRouteNames = currentRoute?.state?.routeNames;
  
  let currentRouteName: string | null = null;
  if (currentRouteIndex !== undefined && currentRouteNames && currentRouteNames.length > currentRouteIndex) {
    currentRouteName = currentRouteNames[currentRouteIndex];
  }

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [animationValue]);

  const handleClose = () => {
    Animated.timing(animationValue, {
      toValue: 500,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(closeDrawer);
  };

  const menuItems = [
    { icon: <ProfileCircle size={30} color="white"  />, label: "Cliente", route: "Cliente" },
    { icon: <House size="24" color="white"  />, label: "Propriedades", route: "Propriedades" },
    { icon: <Routing size={24} />, label: "Visitas", route: "Visitas" },
    { icon: <CardPos size={24} />, label: "Financeiro", route: "Financeiro" },
    { icon: <Calendar size={24} />, label: "Agenda", route: "Agenda" },
    { icon: <Profile2User size={24} />, label: "Consultor", route: "Consultor" },
    { icon: <TicketStar size={24} />, label: "Eventos", route: "Eventos" },
  ];

  const profileItems = [
    { icon: <SmsNotification  size={24} />, label: "Notificações", route: "Notificações" }
  ];

  return (
    <View className="absolute top-0 flex w-full h-full mb-20">
      <View className="z-0 absolute top-0 left-0 bg-black opacity-50 w-full h-full" style={{ paddingVertical: statusBarHeight }} onTouchEndCapture={handleClose}></View>
      <Animated.View
        style={{
          transform: [{ translateX: animationValue }],
          position: "absolute",
          zIndex: 10,
          top: 0,
          right: 0,
          width: "65%",
          height: "100%",
          backgroundColor: "white",
          padding: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
          paddingVertical: statusBarHeight,
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          gap: 10,
        }}
      >
        <Text className="font-bold text-xl text-[#49454F]">Menus</Text>
        {menuItems.map((item) => (
          <MenuItem
            key={item.route}
            icon={item.icon}
            label={item.label}
            route={item.route}
            currentRoute={currentRouteName}
            onPress={() => {
              navigation.navigate(item.route);
              handleClose();
            }}
          />
        ))}
        <Divider />
        {profileItems.map((item) => (
          <MenuItem
            key={item.route}
            icon={item.icon}
            label={item.label}
            route={item.route}
            currentRoute={currentRouteName}
            onPress={() => {
              navigation.navigate(item.route);
              handleClose();
            }}
          />
        ))}
        <Divider />
        <TouchableOpacity
          onPress={onLogout}
          style={{padding:7, marginTop: 20, borderRadius: 16, backgroundColor: "#023A5D", justifyContent: "center", display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}
        >
          <LogoutCurve size={24} color="white" />
          <Text className="my-2 text-white font-bold">Sair</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default CustomDrawer;
