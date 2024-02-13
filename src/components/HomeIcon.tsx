import React from 'react';
import { View, Text } from 'react-native';

interface HomeIconProps {
  id: string;
  name: string;
  introduction: string;
  price: number;
}

const HomeIcon = ({ introduction }: HomeIconProps) => {
  return (
    <View>
      <Text>{introduction}</Text>
    </View>
  );
};

export default HomeIcon;
