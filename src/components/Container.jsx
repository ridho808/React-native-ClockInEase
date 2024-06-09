import { View, ImageBackground, Text } from 'react-native'
import React from 'react'
import { Background } from '@assets/index'

const Container = ({classname,children}) => {
  return (
    <View className="flex-1">
        <ImageBackground source={Background}  resizeMode="cover" className={classname}>
            {children}
        </ImageBackground>
    </View>
      
  )
}

export default Container