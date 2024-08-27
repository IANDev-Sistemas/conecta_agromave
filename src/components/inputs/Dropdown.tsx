import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, Text, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

interface DropdownProps {
  list: Array<{ key: number | string; name: string }>;
  value: any;
  label?: string;
  onChange: (key: number | string) => void;
  placeholder?: string;
  position?: 'auto' | 'top' | 'bottom';
  blur?: () => void;
  disable?: boolean;
  search?: boolean;
  searchField?: 'name' | 'key';
}

const CustomDropdown: React.FC<DropdownProps> = ({
  list,
  value,
  label,
  onChange,
  placeholder,
  position,
  blur,
  disable,
  search,
  searchField,
}) => {
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
        data={list}
        maxHeight={200}
        labelField="name"
        valueField="key"
        placeholder={placeholder ?? ''}
        value={value}
        search={search}
        searchPlaceholder="Busca..."
        searchField={searchField}
        renderRightIcon={
          search ? () => <EvilIcons name="search" size={24} color="#ACB4BA" /> : undefined
        }
        onChange={(item) => onChange(item.key)}
        dropdownPosition={position ? position : 'auto'}
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
    width: '100%',
    color: '#ACB4BA',
    fontWeight: '400',
    fontSize: 12,
    padding: 10,
    borderRadius: 12,
    height: 44,
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
});

export default CustomDropdown;
