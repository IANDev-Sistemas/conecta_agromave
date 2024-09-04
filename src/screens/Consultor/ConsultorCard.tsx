import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { DirectboxReceive, Whatsapp } from "iconsax-react-native";
import { Avatar } from "@rneui/themed";
import { Linking } from "react-native";

interface ConsultorProps {
  codigo: string;
  telefone: string | null;
  nr: number;
  nome: string;
  email: string | null;
}

const ConsultorCard: React.FC<ConsultorProps> = ({ nome, telefone, email }) => {
  const handleContact = () => {
    if (telefone) {
      const whatsappUrl = `https://wa.me/${telefone}`;
      Linking.openURL(whatsappUrl).catch(() =>
        Alert.alert("Erro", "Não foi possível abrir o WhatsApp.")
      );
    } else {
      Alert.alert(
        "Contato Indisponível",
        "O telefone do consultor não está disponível."
      );
    }
  };

  const handleEmail = () => {
    if (email) {
      const mailUrl = `mailto:${email}`;
      Linking.openURL(mailUrl).catch(() =>
        Alert.alert("Erro", "Não foi possível abrir o cliente de e-mail.")
      );
    } else {
      Alert.alert(
        "E-mail Indisponível",
        "O e-mail do consultor não está disponível."
      );
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Text style={styles.tipoText}>Consultor</Text>
        <Avatar
          size={80}
          icon={{name: 'user', type: 'font-awesome'}}
          avatarStyle={styles.avatarStyle}
          containerStyle={styles.avatarContainer}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nomeText}>{nome}</Text>

        <View style={styles.contactRow}>
          <Whatsapp size={24} color={telefone ? "#25D366" : "gray"} />
          <TouchableOpacity onPress={handleContact}>
            <Text style={styles.infoText}>
              {telefone ? telefone : "Número não disponível"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contactRow}>
          <DirectboxReceive size={24} color={email ? "#0072C6" : "gray"} />
          <TouchableOpacity onPress={handleEmail}>
            <Text style={styles.infoText}>
              {email ? email : "E-mail não disponível"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    width: "92%",
    borderRadius: 16,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tipoText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6c757d",
  },
  avatarContainer: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#f0f0f0",
    backgroundColor: "#E7E7E7",
  },
  avatarStyle: {
    borderRadius: 40,
  },
  infoContainer: {
    marginTop: 15,
    alignItems: "flex-start",
    gap: 8,
  },
  nomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#495057",
    marginLeft: 8,
    flexShrink: 1,
    maxWidth: "85%", // Limita o comprimento do texto para melhor aparência
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    width: "100%",
  },
});

export default ConsultorCard;
