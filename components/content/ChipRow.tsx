import { Chip, Label } from 'heroui-native'
import React from 'react'
import { ScrollView, View } from 'react-native'

interface ChipRowProps<T extends string> {
    title: string
    array: readonly T[], 
    setter: (value: T) => void, 
    itemState: T
}

const ChipRow = <T extends string>({title, array, setter, itemState}: ChipRowProps<T>) => {
    return (
        <View className='mb-4'>
            <Label className='text-primary-text text-lg pl-5 mb-2'>{title}</Label>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='px-4'>
            {array.map(item => (
                <Chip 
                    size="lg" 
                    key={item} 
                    className='mr-2'
                    onPress={() => setter(item)}
                    variant= {item.toLowerCase() === itemState.toLowerCase() ? "primary" : "secondary"}
                >
                    {item.capitalize()}
                </Chip>
            ))}
            </ScrollView>
        </View>
    )
}

export default ChipRow