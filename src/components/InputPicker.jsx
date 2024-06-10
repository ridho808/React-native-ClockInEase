import { View, Text } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome6"
import RNPickerSelect from 'react-native-picker-select';

export default function InputPicker({icon,Title,size,OnvalueChange,Items}) {
  return (
    <View className="w-[85%] mx-auto border-b border-[#B8BC00] mb-4">
        <Text className="text-black font-bold">{Title}</Text>
        <View className="flex-row items-center">
            <Icon name={icon} size={size ? size : 20} color="black"/>
            <View className="w-[100%]">
                <RNPickerSelect 
                onValueChange={OnvalueChange}
                items={Items ? Items : [{label:"Belum Tesedia",value:"Belum Tersedia",id:0}]}
                placeholder={{label:Title,value : null}}
                style={{inputAndroid:{color:"#000"}}}
                />
            </View>
        </View>
    </View>
  )
}