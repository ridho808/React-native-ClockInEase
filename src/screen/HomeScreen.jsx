import React, { useState } from 'react'
import Container from '@components/Container'
import {ActivityIndicator, Modal, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import Headers from '@components/Headers'
import { ClearStroge } from '@utils/EncryptStorage'
import Icon from "react-native-vector-icons/Ionicons"
import IconQr from "react-native-vector-icons/MaterialIcons"
import { useAppContext } from '@context/AppContext'
import ButtonPrev from '@components/ButtonPrev'
import { Shadow } from '@utils/StyleGlobal'
import ButtonNext from '@components/ButtonNext'
import moment from "moment"
import "moment/locale/id.js"
import { API_URL } from '@utils/Cons'
import { ScrollView } from 'react-native-gesture-handler'
import ServerAPI from '@api/Http'

export default function HomeScreen({navigation}) {
  const {InfoUser,Token} = useAppContext()
  const {name,email} = InfoUser
  const [Month,setMonth] = useState([]);
  const [DataPresence,setDatePresence] = useState({});
  const [Index,setIndex] = useState(0);
  const [ModalVisible,setModalVisible] = useState(false)
  const URL = ServerAPI(Token)

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? Month.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === Month.length - 1 ? 0 : prevIndex + 1));
  };

  const LogOut = async () =>{
    try {
      await ClearStroge();
      navigation.reset({routes:[{name:"LoginScreen"}]})
    } catch (error) {
      console.log(error);
    }
  }

  const GetSourceData = async () =>{
    try {
      const { data } = await URL.get(API_URL +"/get-data-user-in-year")
      const month = Object.keys(data)
      const IndexMonth = month.findIndex((value)=>value === moment().format("MMMM"));
      setDatePresence(data)
      setIndex(IndexMonth)
      setMonth(month);
    } catch (error) {
      console.log(error);
    }
  }

  const ChangeMont = (values) =>{
    setIndex(values)
    setModalVisible(!ModalVisible)
  }

  const NavigateToCameraScreen = () =>{
    navigation.navigate("CameraScreen")
  }

  useState(()=>{
    GetSourceData()
  },[]);


  return (
      <Container classname={"flex-1"}>
        <Headers Event={LogOut}/>

        <View className="p-5">
          <Text className="font-[Roboto-MediumItalic] text-black">Selamat Datang,</Text>
          <View className="flex-row items-center">
            <Icon name="person-circle" size={50} color="black"/>
            <View className="p-3">
              <Text className="text-2xl font-bold text-black">{name}</Text>
              <Text className="font-[Roboto-Italic]">{email}</Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center justify-between w-[85%] mx-auto">
          
          <View className="flex-row w-[220px] justify-evenly">
            <ButtonPrev Event={handlePrev}/>
            <View className="bg-white w-[100px] items-center justify-center rounded-xl" style={Shadow}>
              {
                !Month.length ?
                <ActivityIndicator color={"black"} size={30}/> :
                <Text className="text-black font-bold">
                  {Month[Index]}
                </Text>
              }
            </View>
            <ButtonNext Event={handleNext}/>
          </View>

          <TouchableOpacity onPress={()=>setModalVisible(!ModalVisible)} className="bg-white p-2 rounded-full" style={Shadow}>
            <Icon name="calendar" size={26} color="black"/>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap items-center justify-evenly w-[86%] mx-auto mt-4">
              {
              DataPresence[Month[Index]]?.map((value,index)=>(<CalendarBox key={index} value={value} index={index} />)) 
              }
        </View>

        <TouchableOpacity onPress={NavigateToCameraScreen} className="bg-[#D4CB00] p-3 absolute right-6 bottom-5 rounded-full" style={Shadow}>
          <IconQr name="qr-code-scanner" size={30} color="white"/>
        </TouchableOpacity>
        
        <Modal animationType='fade' visible={ModalVisible} transparent>
          <View className="flex-1 bg-[#0000006b] justify-center items-center">
            <View className="bg-white w-[85%] h-[380px] p-2 rounded-md">
              <View className="flex-row items-center justify-between">
                <Icon name="calendar" size={25} color="black"/>
                <Text className="text-lg font-bold text-black">Pilih Bulan</Text>
                <TouchableOpacity onPress={()=>setModalVisible(!ModalVisible)} className="p-1">
                  <Icon name="close-sharp" size={25} color="black"/>
                </TouchableOpacity>
              </View>
              <ScrollView className="mt-2" showsVerticalScrollIndicator={false}>
                {Month.flatMap((value,index)=>(
                  <TouchableOpacity onPress={()=>ChangeMont(index)} key={index} className="w-[90%] mx-auto bg-gray-100 my-2 p-2 rounded-xl" style={Shadow}>
                    <Text className="text-center text-black font-semibold">{value}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

      </Container>
  )
}


const CalendarBox = ({value,index})=>{
  const background = value.statusPresence == "Hadir" ? "bg-[#1E90FF]": "bg-black";
  const Time = value.out == " " ? value.in?.slice(0,5) : value.out?.slice(0,5);
  const IsPresence = value.out != " " && value.out != null
  return (
    <View className={`w-[58] h-[58] mx-1 my-2 rounded-md justify-center ${background}`}>
      <Text className="absolute top-1 left-1 text-white text-[8px] font-bold">{index + 1}</Text>
      <View className="absolute top-0 right-0 p-1 rounded-full">
        {
          IsPresence &&
          <Icon name="checkmark-circle" size={10} color="white"/>
        }
      </View>
      <Text className="text-white text-[10px] font-bold text-center">{value.statusPresence}</Text>
      <Text className="text-white text-[9px] font-bold text-center absolute bottom-1 left-4">{Time}</Text>
    </View>
  )
}