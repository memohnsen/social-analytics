import { TabBarContext } from '@/context/TabBarContext';
import { useFocusEffect } from 'expo-router';
import { use } from 'react';
import { Text, View } from 'react-native';

const ContentDetails = () => {
  const { setIsTabBarHidden } = use(TabBarContext);

  useFocusEffect(() => {
    setIsTabBarHidden(true);
    return () => setIsTabBarHidden(false);
  });

  return (
    <View>
      <Text>ContentDetails</Text>
    </View>
  )
}

export default ContentDetails