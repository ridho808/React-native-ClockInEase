import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons"

const InputText = ({Title,Placeholder,Value,Event,size,Type,icon}) => {
  return (
      <View className="w-[85%] mx-auto border-b border-[#B8BC00]">
        <Text className="text-black font-bold">{Title}</Text>
        <View className="flex-row items-center">
            <Icon name={icon} size={size? size : 20} color="black"/>
            <TextInput value={Value} onChangeText={Event} autoCapitalize='none' keyboardType={Type} placeholder={Placeholder}/>
        </View>
      </View>
  )
}

export default InputText