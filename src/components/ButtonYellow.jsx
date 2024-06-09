import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ButtonYellow() {
  return (
     <TouchableOpacity className="bg-[#D4CB00] w-[230px] h-[39px] mx-auto p-2 rounded-md my-2">
         <Text className="text-center font-bold text-white">Masuk</Text>
     </TouchableOpacity>
  )
}