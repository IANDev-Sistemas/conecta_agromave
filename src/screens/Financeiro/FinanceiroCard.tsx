import React from "react";
import { Divider } from "@rneui/themed";
import { Text, TouchableOpacity, View } from "react-native";

interface HomeCardProps {
  title: string;
  value: string;
}

const FinanceiroCard: React.FC<HomeCardProps> = ({ title, value }) => {
  return (
    <TouchableOpacity>
      <View
        className="w-full h-24 bg-white rounded-xl items-center py-2"
        style={{
          shadowColor: "000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 10,
        }}
      >
        <Text className="text-xl font-bold">{title}</Text>
        <Text className="text-2xl font-semibold text-[#595959]">{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FinanceiroCard;
