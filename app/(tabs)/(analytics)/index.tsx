import React from 'react'
import { ScrollView, Text } from 'react-native'

const Analytics = () => {
  return (
    <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        contentContainerClassName='px-4'
        className='flex-1 bg-background'
      >
        <Text>Settings</Text>
      </ScrollView>
  )
}

export default Analytics