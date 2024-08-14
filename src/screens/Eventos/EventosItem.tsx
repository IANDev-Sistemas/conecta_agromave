
import { Calendar2, Location } from "iconsax-react-native";
import React, { useState } from "react";
import { View, Text, Image, Pressable, Modal, Animated, TouchableOpacity } from "react-native";
import ModalEvento from "./ModalEvento";

interface EventosItemProps {
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  description: string;
  onRedirect: () => void;
}

const EventosItem: React.FC<EventosItemProps> = ({ title, date, location, imageUrl, description, onRedirect }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const opacity = new Animated.Value(0);


  return (
    <View className=" bg-white w-5/6 rounded-2xl mx-2, mb-5" style={{shadowColor:"000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2,}}>
      <TouchableOpacity style={{display:"flex", flexDirection:"row", padding:10}} onPress={() => setModalVisible(true)}>
      <Image
        source={{ uri: imageUrl }}
        className="w-28 h-28 rounded-lg "
        resizeMode="cover"
      />
      <View className="ml-4 gap-2">
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

export default EventosItem;
