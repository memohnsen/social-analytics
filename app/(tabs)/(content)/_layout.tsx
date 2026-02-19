import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'

const ContentLayout = () => {
  const colorScheme = useColorScheme()

  return (
    <Stack>
      <Stack.Screen
        name="index"
      /> 
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: "Update Content",
          headerBackButtonDisplayMode: 'minimal',
          headerLargeTitleEnabled: false,
          headerTransparent: true,
          headerTitleStyle: {
            color: colorScheme === 'dark' ? '#fff' : '#000'
          },
        }}
      />     
    </Stack>
  )
}

export default ContentLayout