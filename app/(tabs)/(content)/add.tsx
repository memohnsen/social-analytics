import { TabBarContext } from '@/context/TabBarContext';
import { useFocusEffect } from 'expo-router';
import { use } from 'react';
import { Text, View } from 'react-native';

const AddContent = () => {
  const { setIsTabBarHidden } = use(TabBarContext);

  useFocusEffect(() => {
    setIsTabBarHidden(true);
    return () => setIsTabBarHidden(false);
  });

  return (
    <View>
      <Text>AddContent</Text>
    </View>
  )
}

export default AddContent