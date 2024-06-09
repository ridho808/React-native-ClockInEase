import React, { useEffect } from 'react'
import Container from '@components/Container'
import Icon from "react-native-vector-icons/MaterialIcons"

export default function SplashScreen({navigation}) {

  useEffect(()=>{
    setTimeout(()=>{
        navigation.reset({routes:[{name:"LoginScreen"}]})
    },3000);
  },[])

  return (
    <Container classname={"flex-1 justify-center items-center"}>
        <Icon name="qr-code-scanner" size={96} color="black"/>
    </Container>
  )
}