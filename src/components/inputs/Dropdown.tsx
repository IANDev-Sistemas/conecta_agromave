import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

interface DropdownProps {
  list: Array<{ key: number | string; name: string }>;
  value: any;
  label?: string;
  onChange: (key: number | string | null) => void;
  placeholder?: string;
  position?: 'auto' | 'top' | 'bottom';
  blur?: () => void;
  disable?: boolean;
  search?: boolean;
  searchField?: 'name' | 'key';
  clearable?: boolean;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  list,
  value,
  label,
  onChange,
  placeholder,
  position = 'auto',
  blur,
  disable = false,
  search = false,
  searchField = 'name',
  clearable = false,
}) => {
  const [filteredData, setFilteredData] = useState(list);
  const [inputValue, setInputValue] = useState<string | null>(value ?? '');

  useEffect(() => {
    setInputValue(value ?? ''); // Sincroniza input com o valor selecionado
  }, [value]);

  const handleSearch = (text: string) => {
    setInputValue(text);
    const filtered = list.filter((item) =>
      item[searchField].toString().toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleClear = () => {
    setInputValue(''); // Limpa o campo de texto
    setFilteredData(list); // Restaura a lista completa
    onChange(null); // Define o valor como null
  };

  if (blur) blur();

  const textColor = disable ? '#ACB4BA' : '#000000';

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={{ color: textColor, fontSize: 14 }}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        containerStyle={styles.dropdownContainer}
        data={filteredData}
        maxHeight={200}
        labelField="name"
        valueField="key"
        placeholder={placeholder ?? ''}
        value={inputValue}
        search={search}
        searchPlaceholder="Busca..."
        onChangeText={search ? handleSearch : undefined}
        renderRightIcon={() =>
          clearable && inputValue ? (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <EvilIcons name="close" size={24} color="#ACB4BA" />
            </TouchableOpacity>
          ) : search ? (
            <EvilIcons name="search" size={24} color="#ACB4BA" />
          ) : null
        }
        onChange={(item) => {
          onChange(item.key); // Atualiza o valor selecionado
          setFilteredData(list); // Restaura a lista completa
        }}
        dropdownPosition={position}
        disable={disable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },
  dropdown: {
    backgroundColor: '#EEEEEE',
    padding: 10,
    borderRadius: 12,
    height: 44,
    width: '100%',
  },
  placeholderStyle: {
    color: '#ACB4BA',
    fontSize: 14,
  },
  inputSearchStyle: {
    color: '#000000',
    fontSize: 14,
  },
  itemTextStyle: {
    fontSize: 14,
  },
  dropdownContainer: {
    borderRadius: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  clearButton: {
    marginLeft: 8,
  },
});

export default CustomDropdown;
