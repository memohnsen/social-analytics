import { Stack } from 'expo-router'
import React from 'react'

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Settings',
          headerLargeTitleEnabled: true,
          headerTransparent: true,
        }}
      />  
    </Stack>
  )
}

export default SettingsLayout