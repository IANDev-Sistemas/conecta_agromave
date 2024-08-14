import React from "react";
import {  Text, TouchableOpacity, } from "react-native";


type AgendaItemProps = {
  item: {
    tipo: string;
    data: string;
    consultor: string;
  };
  onPress: (item: any) => void;
};

const AgendaItem: React.FC<AgendaItemProps> = React.memo(({ item: schedule, onPress }) => {
  return (

      <TouchableOpacity style={{width:"100%"}} onPress={() => onPress(schedule)}>
        <Text>Ola</Text>
      </TouchableOpacity>
  );
});

export default AgendaItem;
