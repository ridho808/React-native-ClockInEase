import { View, ImageBackground, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Background } from '@assets/index'

const Container = ({classname,children}) => {
  return (
    <SafeAreaView className="flex-1">
        <ImageBackground source={Background}  resizeMode="cover" className={classname}>
            {children}
        </ImageBackground>
    </SafeAreaView>
      
  )
}

export default Container