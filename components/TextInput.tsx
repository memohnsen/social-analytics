import { Input, Label, TextField } from 'heroui-native';
import React from 'react';
import { KeyboardTypeOptions } from 'react-native';


interface TextInputProps {
    title: string
    placeholder: string
    keyboardType: KeyboardTypeOptions
    largeHeight?: boolean
    autoCaptalize?: "none" | "sentences" | "words" | "characters" | undefined
    value: string
    onChangeText: (value: string) => void
}

const TextInput = ({title, placeholder, keyboardType, value, onChangeText, largeHeight, autoCaptalize}: TextInputProps) => {
  return (
    <TextField className='w-full mb-4 px-4'>
        <Label>{title}</Label>
        <Input 
            placeholder={placeholder} 
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize={autoCaptalize}
            className={`${largeHeight ? 'pb-16' : 'pb-3'}`}
        />
    </TextField>
  )
}

export default TextInput