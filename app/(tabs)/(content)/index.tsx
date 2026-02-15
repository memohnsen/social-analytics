import { ScrollView, Text } from 'react-native';

const Kanban = () => {
  return (
    <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        contentContainerClassName='px-4'
        className='flex-1'
      >
        <Text>Kanban</Text>
      </ScrollView>
  )
}

export default Kanban