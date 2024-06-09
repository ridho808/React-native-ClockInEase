import { View, Text } from 'react-native'
import React from 'react'
import Container from '@components/Container'
import InputText from '@components/InputText'
import InputPassword from '@components/InputPassword'
import ButtonGreen from '@components/ButtonGreen'
import ButtonYellow from '@components/ButtonYellow'
import { useAppContext } from '@context/AppContext'

export default function LoginScreen() {
  const { Token } = useAppContext()

  return (
    <Container classname={"flex-1 justify-center p-2"}>
            <Text className="text-[20px] text-center font-bold text-black mb-4">MASUK</Text>
            
            <View className="h-[160px] justify-around">
              <InputText icon={"email"} Type={"email-address"} Placeholder={"contoh@gmail.com"} Title={"Email"}/>
              <InputPassword icon={"lock"} Placeholder={"Kata Sandi...."} Title={"Password"}/>
            </View>
            
            <View className="h-[150px] items-center justify-center">
              <ButtonYellow />
              <ButtonGreen />
            </View>
    </Container>
  )
}