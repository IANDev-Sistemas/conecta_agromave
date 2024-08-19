import React, { ReactNode } from 'react';
import { View, Text} from 'react-native';

interface HeaderProps {
    title: string;
    children?: ReactNode;
    shadowOff?: boolean
  }

const Header: React.FC<HeaderProps> = ({  title, children, shadowOff}) => {
  return (
    <View className="w-full justify-center px-8 py-5 rounded-b-2xl bg-white" style={shadowOff?(null):({shadowColor:"000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2, elevation:20})}>
        <Text className='font-bold text-xl mb-3' >{title}</Text>
        {children}
    </View>
  );
};

export default Header;