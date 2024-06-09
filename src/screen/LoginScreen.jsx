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

export default function LoginScreen({navigation}) {
  const [formData,setFormData] = useState({
    email : "",
    password :""
  });
  const [seePassword,setSeePassword] = useState(true)
  const [Loading,setLoading] = useState(false)
  const { setToken } = useAppContext()
  const ChangeEmail = (email)=>setFormData((prev)=>({...prev,email}));
  const ChangePass = (password)=>setFormData((prev)=>({...prev,password}));
  const VisiblePass = () => setSeePassword(!seePassword);
  const LoginApp = async() =>{
    try {
      const {email,password} = formData
      isValidEmail(email)
      Keyboard.dismiss()
      setLoading(!Loading)
      if(!email || !password || !isValidEmail) return ToastAndroid.show("Email/Password Tidak Valid",ToastAndroid.BOTTOM)
      const {data} = await axios.post(API_URL+"/login",formData)
      setToken(data.token)
      await StoreData("data_User",JSON.stringify(formData))
      await StoreData("Token_USer",data.token)
      setLoading(false)
      setFormData({email:"",password:""})
      // navigation.reset({routes:["HomeScreen"]})
      console.log(data)
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Periksa Koneksi Internet Gagal Akses Aplikasi",ToastAndroid.BOTTOM)
    }
  }
  
  return (
    <Container classname={"flex-1 justify-center p-2"}>
            <Text className="text-[20px] text-center font-bold text-black mb-4">Masuk</Text>
            
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
              <ButtonYellow Event={LoginApp} />
              <ButtonGreen />
            </View>

            <LoadingModal Visible={Loading}/>
    </Container>
  )
}