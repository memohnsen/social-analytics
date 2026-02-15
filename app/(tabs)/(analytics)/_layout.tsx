import { Stack } from 'expo-router'
import React from 'react'

const AnalyticsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Analytics',
          headerLargeTitleEnabled: true,
          headerTransparent: true,
        }}
      />   
    </Stack>
  )
}

export default AnalyticsLayout