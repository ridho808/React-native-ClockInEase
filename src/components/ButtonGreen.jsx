import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ButtonGreen() {
  return (
     <TouchableOpacity className="bg-[#3ADE00] w-[140px] h-[39px] mx-auto p-2 rounded-md">
         <Text className="font-bold text-white text-center">Daftar</Text>
     </TouchableOpacity>
  )
}