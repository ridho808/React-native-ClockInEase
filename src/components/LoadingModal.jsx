import { View, Text, Modal } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { Animation } from '@assets/index'
import { Shadow } from '@utils/StyleGlobal'

export default function LoadingModal({Visible}) {
  return (
    <Modal 
    transparent
    visible={Visible}
    >
        <View className="flex-1 justify-center">
            <View className="bg-white w-[80%] h-[300px] mx-auto items-center justify-center rounded-xl" style={Shadow}>
                <LottieView 
                source={Animation} 
                autoPlay loop 
                style={{width: "100%",height:"60%"}}
                />
            </View>
        </View>

    </Modal>
  )
}