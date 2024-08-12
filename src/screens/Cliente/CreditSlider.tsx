import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface CreditSliderProps {
  maxCreditLimit: number;
  currentCredit:number;
  setCurrentCredit:(value:number)=>void;
}

const CreditSlider: React.FC<CreditSliderProps> = ({ maxCreditLimit,  currentCredit, setCurrentCredit }) => {


  const handleValueChange = (value: number) => {
    setCurrentCredit(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={maxCreditLimit}
          step={50} 
          value={currentCredit}
          onValueChange={handleValueChange}
          minimumTrackTintColor="#D67575"
          maximumTrackTintColor="#F2BABA"
          thumbTintColor="#A34242"
        />
      </View>
      <Text style={styles.creditText}>
        R$ {currentCredit.toFixed(2)} / R$ {maxCreditLimit.toFixed(2)}
      </Text>
      <Text style={styles.limitText}>Limite de crédito</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    width: '80%',
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 30,
  },
  creditText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  limitText: {
    fontSize: 14,
    color: '#666',
  },
});

export default CreditSlider;
