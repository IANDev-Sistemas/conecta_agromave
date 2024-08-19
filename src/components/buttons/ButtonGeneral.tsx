import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const ButtonGeneral: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onClick}
      disabled={disabled}
    >
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
    padding:10,
    borderRadius: 25,
    backgroundColor: '#F66E58', 
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
