import React, { useEffect } from 'react'
import Container from '@components/Container'
import Icon from "react-native-vector-icons/MaterialIcons"
import { GetDataStore } from '@utils/EncryptStorage'
import { useAppContext } from '@context/AppContext'
import axios from 'axios'
import { API_URL } from '@utils/Cons'

export default function SplashScreen({navigation}) {
  const {setToken,setInfoUser} = useAppContext()
  
  const getUsers =async () =>{
    try {
      const user = await GetDataStore("data_User");
      const JSONparse = JSON.parse(user);
      if(!JSONparse) return null
      const {data} = await axios.post(API_URL+"/login",JSONparse);
      setToken(data.token);
      setInfoUser(data.user)
      navigation.reset({routes:[{name:"HomeScreen"}]})
    } catch (error) {
      console.log(error.response);
    }
  }
  useEffect(()=>{
    getUsers()
  },[])

  return (
    <Container classname={"flex-1 justify-center items-center"}>
        <Icon name="qr-code-scanner" size={96} color="black"/>
    </Container>
  )
}