import { Calendar2, Location } from "iconsax-react-native";
import React, { useState } from "react";
import { View, Text, Image, Pressable, Modal, Button, ImageSourcePropType } from "react-native";
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

const EventoCard: React.FC<EventoCardProps> = ({ title, date, location, imageUrl, description, onRedirect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="bg-white rounded-2xl mx-2 " style={{shadowColor:"000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2,}}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={{ uri: imageUrl }} className="w-full h-48 rounded-t-2xl" />
        <View className="ml-4 py-4 gap-2">
        <Text className="text-lg font-semibold">{title}</Text>
        <View className="flex-row items-center mt-2 gap-2">
            <Calendar2 size={20} color="#292D32" />
          <Text className="text-gray-600">{date}</Text>
        </View>
        <View className="flex-row items-center mt-1 gap-2">
            <Location size={20} color="#292D32" />
          <Text className="text-gray-600">{location}</Text>
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

export default EventoCard;
