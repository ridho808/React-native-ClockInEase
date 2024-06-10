import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons"

const InputPassword = ({Title,Placeholder,size,icon,Value,Event,ShownPass,EventPass}) => {
    return (
        <View className="w-[85%] mx-auto border-b border-[#B8BC00] mb-4">
          <Text className="text-black font-bold">{Title}</Text>
          <View className="flex-row items-center">
              <Icon name={icon} size={size? size : 20} color="black"/>
              <TextInput className="w-full" secureTextEntry={ShownPass} value={Value} onChangeText={Event} placeholder={Placeholder} />
              <TouchableOpacity onPress={EventPass} className="p-2 absolute right-0">
                <Icon name={"remove-red-eye"} size={size? size : 20} color="black"/>
              </TouchableOpacity>
          </View>
        </View>
    )
}

export default InputPassword