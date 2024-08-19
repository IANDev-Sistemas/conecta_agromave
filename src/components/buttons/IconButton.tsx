import { Badge } from "@rneui/themed";
import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

interface IconButtonProps {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  ativo: boolean;
  badgeValue?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  label,
  onClick,
  icon,
  ativo = true,
  badgeValue,
}) => {
  return (
    <View className="justify-center items-center  gap-3">
      <TouchableOpacity
        style={[styles.button, ativo ? styles.active : styles.inactive]}
        onPress={onClick}
      >
        {badgeValue && (
          <Badge
            status="error"
            value={badgeValue}
            containerStyle={{ position: "absolute", top: -4, right: -4 }}
          />
        )}
        <View style={styles.iconContainer}>{icon}</View>
      </TouchableOpacity>
      <Text className="font-semibold">{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 25,
    shadowColor: "000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation:10
  },
  active: {
    backgroundColor: "#1B3265",
  },
  inactive: {
    backgroundColor: "white",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconButton;
