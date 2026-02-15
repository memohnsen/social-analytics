import { Stack } from 'expo-router'
import React from 'react'
import { useColorScheme } from 'react-native'

const SettingsLayout = () => {
  const colorScheme = useColorScheme()
  
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Settings',
          headerLargeTitleEnabled: true,
          headerTransparent: true,
          headerTitleStyle: {
            color: colorScheme === 'dark' ? '#fff' : '#000'
          }
        }}
      />  
    </Stack>
  )
}

export default SettingsLayout