import React from "react";
import { Modal, View, Image, Text, StyleSheet } from "react-native";
import ButtonGeneral from "@/src/components/buttons/ButtonGeneral";

interface CustomModalProps {
  visible: boolean;
  imageUrl: string;
  title: string;
  description: string;
  onClose: () => void;
  onRedirect: () => void;
}

const ModalEvento: React.FC<CustomModalProps> = ({
  visible,
  imageUrl,
  title,
  description,
  onClose,
  onRedirect,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay} onTouchEndCapture={onClose}></View>
      <View style={styles.modalContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <ButtonGeneral label="Saiba mais" onClick={onRedirect} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    opacity: 0.5,
  },
  modalContainer: {
    position: "absolute",
    top: "10%",
    left: "10%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    zIndex: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    maxHeight: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 20,
  },
});

export default ModalEvento;
