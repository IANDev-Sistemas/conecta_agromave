import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DirectboxReceive, Whatsapp } from "iconsax-react-native";
import { Avatar } from "@rneui/themed";

interface ConsultorProps {
  tipo: string;
  nome: string;
  contato: string;
  email: string;
}

const ConsultorCard: React.FC<ConsultorProps> = ({
  tipo,
  nome,
  contato,
  email,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.tipoText}>{tipo}</Text>
      <View style={styles.row}>
        <View style={styles.avatarContainer}>
          <Avatar
            size={120}
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            avatarStyle={styles.avatarStyle}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nomeText}>{nome}</Text>
          <View style={styles.row}>
            <Whatsapp size={30} color="black" />
            <Text style={styles.infoText}>{contato}</Text>
          </View>
          <View style={styles.row}>
            <DirectboxReceive size={30} color="black" />
            <Text style={styles.infoText}>{email}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    width: "92%",
    borderRadius: 12,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 20,
  },
  tipoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatarContainer: {
    marginLeft: 15,
  },
  avatarStyle: {
    borderRadius: 12,
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  nomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ConsultorCard;
