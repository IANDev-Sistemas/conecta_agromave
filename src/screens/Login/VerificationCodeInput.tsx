import React, { useState, useRef } from "react";
import { View, TextInput } from "react-native";

interface VerificationCodeInputProps {
  onCodeFilled: (code: string) => void;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({ onCodeFilled }) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    if (text.length <= 1) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text && index < 5) {
        inputs.current[index + 1]?.focus();
      }

      if (newCode.every(char => char !== "")) {
        onCodeFilled(newCode.join(""));
      }
    }
  };

  return (
    <View className="flex-row justify-between my-2 px-3">
      {code.map((char, index) => (
        <TextInput
          key={index}
          ref={ref => {
            inputs.current[index] = ref;
          }}
          className="w-10 h-10 border rounded text-center text-lg"
          keyboardType="number-pad"
          maxLength={1}
          value={char}
          onChangeText={text => handleChangeText(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace" && index > 0 && !char) {
              inputs.current[index - 1]?.focus();
            }
          }}
        />
      ))}
    </View>
  );
};

export default VerificationCodeInput;
