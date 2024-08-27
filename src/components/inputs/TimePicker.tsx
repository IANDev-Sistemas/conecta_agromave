import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

type TimePickerProps = {
  label: string;
  value: Date | null;
  onChange: (time: Date | null) => void;
  icon?: React.ReactNode;
};

const TimePicker: React.FC<TimePickerProps> = ({ label, value, onChange, icon }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: any, selectedTime: Date | undefined) => {
    if (selectedTime) {
      onChange(selectedTime);
    }
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <View style={styles.iosPicker}>
          <DateTimePicker
            value={value || new Date()}
            mode="time"
            display="default"
            onChange={handleChange}
            style={{ margin: 0, padding: 0 }}
          />
        </View>
      ) : (
        <Pressable onPress={() => setShowPicker(true)} style={styles.inputContainer}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={styles.text}>
            {value ? value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : label}
          </Text>
          {showPicker && (
            <DateTimePicker
              value={value || new Date()}
              mode="time"
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
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  iosPicker: {
    height: 40,
    width: 80,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB", // Cor de fundo cinza claro
    borderRadius: 9999, // Bordas arredondadas
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: "#ADADAD", // Cor do texto
    fontSize: 16,
  },
});

export default TimePicker;
