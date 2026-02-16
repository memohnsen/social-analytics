import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'

const ContentLayout = () => {
  const colorScheme = useColorScheme()

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Content',
          headerLargeTitleEnabled: true,
          headerBackButtonDisplayMode: 'minimal',
          headerTransparent: true,
          headerTitleStyle: {
            color: colorScheme === 'dark' ? '#fff' : '#000'
          }
        }}
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
      <Stack.Screen
        name="add"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal',
          title: 'Add Content',
          headerLargeTitleEnabled: false,
          headerTransparent: true,
          headerTitleStyle: {
            color: colorScheme === 'dark' ? '#fff' : '#000'
          }
        }}
      />     
    </Stack>
  )
}

export default ContentLayout