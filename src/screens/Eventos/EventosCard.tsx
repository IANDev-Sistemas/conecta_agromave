import { Calendar2, Location } from "iconsax-react-native";
import React, { useState } from "react";
import { View, Text, Image, Pressable, Modal, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ModalEvento from "./ModalEvento";

interface EventoCardProps {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  description: string;
  onRedirect: () => void;
}

const EventoCard: React.FC<EventoCardProps> = ({
  title,
  date,
  location,
  imageUrl,
  description,
  onRedirect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.infoRow}>
            <Calendar2 size={20} color="#292D32" />
            <Text style={styles.infoText}>{date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Location size={20} color="#292D32" />
            <Text style={styles.infoText}>{location}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <ModalEvento
        visible={modalVisible}
        imageUrl={imageUrl}
        title={title}
        description={description}
        onClose={() => setModalVisible(false)}
        onRedirect={onRedirect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 190,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  infoText: {
    color: "#6B7280",
    marginLeft: 8,
  },
});

export default EventoCard;
