import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type DatePickerProps = {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  icon?: React.ReactNode;
};

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, icon }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
  };

  return (
    <View className=" justify-center items-center">
      {Platform.OS === 'ios' ? (
        <View className="h-10 w-28">
          <DateTimePicker
            value={value || new Date()}
            mode="date"
            display="default"
            onChange={handleChange}
            style={{margin:0, padding:0}}
          />
        </View>
      ) : (
        <Pressable onPress={() => setShowPicker(true)} style={styles.inputContainer}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={styles.text}>
            {value ? value.toDateString() : label}
          </Text>
          {showPicker && (
            <DateTimePicker
              value={value || new Date()}
              mode="date"
              display="default"
              onChange={handleChange}
            />
          )}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB", // Cor de fundo semelhante ao StyledInput
    borderRadius: 9999, // Bordas arredondadas
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: "#ADADAD", // Cor do texto semelhante ao StyledInput
    fontSize: 16,
  },
});

export default DatePicker;
