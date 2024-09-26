import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { AttachSquare } from "iconsax-react-native";
import { formatDateString } from "@/src/helpers/formatDateString";

interface VisitasProps {
  user_name: string;
  date: string;
  tipo: string;
  visit_id_sync: string;
}

const VisitasCard: React.FC<VisitasProps> = ({ user_name, date, visit_id_sync }) => {
  const openLink = () => {
    const url = `https://relatorio.tbdc.com.br/visita/${visit_id_sync}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <View style={styles.columnContainer}>
          <View>
            <Text style={styles.text}>Consultor:</Text>
            <Text style={styles.texttitle}>{user_name}</Text>
          </View>
          <View>
            <Text style={styles.text}>Data:</Text>
            <Text style={styles.texttitle}>{formatDateString(date)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={openLink}>
          <AttachSquare size={35} color="#007E34" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems:"center",
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 20,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderColor: "#238228"
  },
  textContainer: {
    flexDirection: "row",
    width: "80%",
  },
  columnContainer: {
    flexDirection: "column",
    gap:10
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    flexWrap: "wrap",
  },
  texttitle:{
    fontSize: 16,
    fontWeight: "600",
    flexWrap: "wrap",
  },
  iconContainer: {
    marginLeft: 10,
  },
});

export default VisitasCard;
