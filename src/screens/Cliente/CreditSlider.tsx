import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { formatCurrency } from '@/src/helpers/formatCurrency';

interface CreditSliderProps {
  maxCreditLimit: number | undefined;
  currentCredit: number | undefined;
}

const CreditSlider: React.FC<CreditSliderProps> = ({ maxCreditLimit, currentCredit }) => {

  if (maxCreditLimit === undefined) {
    maxCreditLimit = 0;
  }

  if (currentCredit === undefined) {
    currentCredit = 0;
  }

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          disabled={true}
          style={styles.slider}
          minimumValue={0}
          maximumValue={maxCreditLimit}
          step={50}
          value={currentCredit}
          minimumTrackTintColor="#023A5D"
          maximumTrackTintColor="#023A5D"
          thumbTintColor="#023A5D"
        />
      </View>
      <Text style={styles.creditText}>
        {formatCurrency(currentCredit)} / {formatCurrency(maxCreditLimit)}
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  limitText: {
    fontSize: 14,
    color: '#666',
  },
});

export default CreditSlider;
