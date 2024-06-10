import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialIcons"

export default function Headers({Event}) {
  return (
   <View className="flex-row items-center">
        <TouchableOpacity onPress={Event} className="scale-x-[-1] w-[50px] p-2 ">
            <Icon name="logout" size={30} color={"black"}/>
        </TouchableOpacity>
        <Text className="text-xl font-[Roboto-Bold] text-black mx-5">ClockInEase</Text>
    </View>
  )
}