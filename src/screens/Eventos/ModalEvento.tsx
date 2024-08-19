import React from "react";
import { Modal, View, Image, Text } from "react-native";
import { Button } from "@rneui/themed";
import LoginButton from "@/src/components/buttons/LoginButton";
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
      <View
        className="z-0 absolute top-0 left-0 w-full h-full justify-center items-center bg-black opacity-50"
        onTouchEndCapture={onClose}
      ></View>
      <View className="left-10 w-5/6 top-56 bg-white rounded-lg p-5 z-10">
      <Image
          source={{ uri: imageUrl }}
          className="w-full h-64 rounded-md"
          resizeMode="contain"  
          style={{ maxHeight: 300 }} 
        />
        <Text className="text-lg font-semibold mt-4 mb-2">{title}</Text>
        <Text className="text-gray-700 mb-4">{description}</Text>
        <ButtonGeneral label="Saiba mais" onClick={onRedirect} />
      </View>
    </Modal>
  );
};

export default ModalEvento;
