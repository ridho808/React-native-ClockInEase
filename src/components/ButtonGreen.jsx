import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ButtonGreen({Event,Title}) {
  return (
     <TouchableOpacity onPress={Event} className="bg-[#3ADE00] w-[140px] h-[39px] mx-auto p-2 rounded-md">
         <Text className="font-bold text-white text-center">{Title}</Text>
     </TouchableOpacity>
  )
}