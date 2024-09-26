import React from "react";
import { View, Pressable, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { Divider } from "@rneui/themed";
import { useAuth } from "../contexts/AuthContext";
import Constants from "expo-constants";
import { expo } from "../../app.json";
import { LogoutCurve, ProfileCircle } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabsTypes } from "./BottomTabs";

const statusBarHeight = Constants.statusBarHeight;

const CustomHeader = ({
  setCardVisible,
  cardVisible,
}: {
  setCardVisible: any;
  cardVisible: boolean;
}) => {
  const { authState, onLogout } = useAuth();

  const toggleCardVisibility = () => {
    setCardVisible(!cardVisible);
  };

  const navigation = useNavigation<BottomTabsTypes>();

  return (
    <View>
      <View
        style={[
          styles.headerContainer,
          { paddingTop: Platform.OS === "ios" ? statusBarHeight : statusBarHeight + 25 }
        ]}
      >
        <Pressable style={styles.profileContainer} onPress={toggleCardVisibility}>
          <ProfileCircle size={30} color="white" variant="Bold" />
          <Text style={styles.greetingText}>Olá, {authState?.usuario?.nome}</Text>
        </Pressable>
      </View>

      {cardVisible && (
        <View style={styles.cardContainer}>
          <View style={styles.menuItemContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Cliente")}
              style={styles.menuItem}
            >
              <ProfileCircle variant="Bold" size={24} color="#007E34" />
              <Text style={styles.menuItemText}>Cliente</Text>
            </TouchableOpacity>
          </View>
          <Divider />
          <Text style={styles.versionText}>Versão {expo.version}</Text>
          <Pressable style={styles.logoutButton} onPress={onLogout}>
            <LogoutCurve size={24} color="white" />
            <Text style={styles.logoutButtonText}>Sair</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#007E34",
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  greetingText: {
    fontWeight: "bold",
    color: "white",
  },
  cardContainer: {
    position: "absolute",
    paddingVertical: 8,
    width: "50%",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    top: statusBarHeight + 40,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 50,
  },
  menuItemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    gap: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuItemText: {
    fontSize: 18,
    color: "#49454F",
    fontWeight: "bold",
  },
  versionText: {
    fontSize: 18,
    color: "#49454F",
    textAlign: "center",
    marginVertical: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#007E34",
    borderRadius: 9999,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginVertical: 8,
    gap: 10,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomHeader;
