import { TabBarContext } from '@/context/TabBarContext';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { use } from 'react';
import { Text, View } from 'react-native';

const AddContent = () => {
  const { setIsTabBarHidden } = use(TabBarContext);
  const params = useLocalSearchParams()
  const id = params.id

  useFocusEffect(() => {
    setIsTabBarHidden(true);
    return () => setIsTabBarHidden(false);
  });

  return (
    <View className='flex-1 bg-background'>
      <Text>AddContent</Text>
    </View>
  )
}

export default AddContent