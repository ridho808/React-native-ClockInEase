import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome"
import { Shadow } from '@utils/StyleGlobal'

export default function ButtonNext({Event}) {
  return (
    <TouchableOpacity onPress={Event} className="bg-white p-3 rounded-full w-[37px]" style={Shadow}>
        <Icon name="chevron-right" size={19} color="black"/>
    </TouchableOpacity>
  )
}