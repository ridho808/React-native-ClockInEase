import { View, Text, Keyboard, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Container from '@components/Container'
import InputText from '@components/InputText'
import InputPassword from '@components/InputPassword'
import ButtonGreen from '@components/ButtonGreen'
import ButtonYellow from '@components/ButtonYellow'
import { useAppContext } from '@context/AppContext'
import LoadingModal from '@components/LoadingModal'
import { API_URL, isValidEmail } from '@utils/Cons'
import axios from 'axios'
import { StoreData } from '@utils/EncryptStorage'
import ServerAPI from "@api/Http"
export default function LoginScreen({navigation}) {
  const [formData,setFormData] = useState({
    email : "",
    password :""
  });
  const [seePassword,setSeePassword] = useState(true)
  const [Loading,setLoading] = useState(false)
  const { setToken,setInfoUser } = useAppContext()
  const ChangeEmail = (email)=>setFormData((prev)=>({...prev,email}));
  const ChangePass = (password)=>setFormData((prev)=>({...prev,password}));
  const VisiblePass = () => setSeePassword(!seePassword);
  const URL = ServerAPI()
  
  const LoginApp = async() =>{
    try {
      const {email,password} = formData
      isValidEmail(email)
      Keyboard.dismiss()
      if(!email || !password || !isValidEmail) return ToastAndroid.show("Email / Password Tidak Valid",ToastAndroid.BOTTOM)
      setLoading(!Loading)
      const { data } = await URL.post("/login",formData)
      setToken(data.token)
      setInfoUser(data.user)
      await StoreData("data_User",JSON.stringify(formData))
      await StoreData("Token_USer",data.token)
      await StoreData("Info_User",JSON.stringify(data.user))
      setLoading(false)
      setFormData({email:"",password:""})
      navigation.reset({routes:[{name:"HomeScreen"}]})

    } catch (error) {
      
      console.log(error);
      setLoading(false)
      ToastAndroid.show("Pastikan Kamu Terhubung ke internet",ToastAndroid.BOTTOM)

    }
  }
  
  const GoToRegister = () =>{
    navigation.navigate("RegisterScreen")
  }

  return (
    <Container classname={"flex-1 justify-center p-2"}>
            <Text className="text-[20px] text-center font-[Roboto-Bold] text-black mb-4">Masuk</Text>
            
            <View className="h-[160px] justify-around">
              <InputText 
              Value={formData.email} 
              Event={ChangeEmail} 
              icon={"email"} 
              Type={"email-address"} 
              Placeholder={"contoh@gmail.com"} 
              Title={"Email"}/>

              <InputPassword  
              Value={formData.password}
              Event={ChangePass}
              EventPass={VisiblePass}
              icon={"lock"}
              ShownPass={seePassword}
              Placeholder={"Kata Sandi...."} 
              Title={"Password"}/>
            </View>
            
            <View className="h-[150px] items-center justify-center">
              <ButtonYellow Event={LoginApp} Title={"Masuk"}/>
              <ButtonGreen Event={GoToRegister} Title={"Daftar"}/>
            </View>

            <LoadingModal Visible={Loading}/>
    </Container>
  )
}