import { Calendar2, Location } from "iconsax-react-native";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import ModalEvento from "./ModalEvento";

interface EventosItemProps {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  description: string;
  onRedirect: () => void;
}

const EventosItem: React.FC<EventosItemProps> = ({
  title,
  date,
  location,
  imageUrl,
  description,
  onRedirect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.row}>
            <Calendar2 size={20} color="#292D32" />
            <Text style={styles.infoText}>{date}</Text>
          </View>
          <View style={styles.row}>
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
  container: {
    backgroundColor: "white",
    width: "83%",
    borderRadius: 20,
    marginHorizontal: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  touchable: {
    flexDirection: "row",
    padding: 10,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 12,
  },
  infoContainer: {
    marginLeft: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  infoText: {
    color: "#6B7280",
    marginLeft: 8,
  },
});

export default EventosItem;
