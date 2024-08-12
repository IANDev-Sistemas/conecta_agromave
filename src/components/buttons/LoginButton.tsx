import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface LoginButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ label, onClick, disabled = false }) => {
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
    height: 50,
    borderRadius: 25,
    backgroundColor: '#800020', 
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

export default LoginButton;
