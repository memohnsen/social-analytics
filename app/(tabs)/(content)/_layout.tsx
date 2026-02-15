import { Stack } from 'expo-router'
import React from 'react'

const ContentLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Content',
          headerLargeTitleEnabled: true,
          headerTransparent: true,
        }}
      /> 
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal',
          title: 'Content',
          headerLargeTitleEnabled: false,
          headerTransparent: true,
        }}
      />  
      <Stack.Screen
        name="add"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal',
          title: 'Content',
          headerLargeTitleEnabled: false,
          headerTransparent: true,
        }}
      />     
    </Stack>
  )
}

export default ContentLayout