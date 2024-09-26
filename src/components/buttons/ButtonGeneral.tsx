import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  color?: string;
}

const ButtonGeneral: React.FC<ButtonProps> = ({ label, onClick, disabled = false, icon, color }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        { backgroundColor: disabled ? '#d3d3d3' : color || '#007E34' }
      ]}
      onPress={onClick}
      disabled={disabled}
    >
      <View>{icon}</View> 
      <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    gap: 7,
  },
  buttonDisabled: {
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#a9a9a9',
  },
});

export default ButtonGeneral;
