import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useBarcodeScanner } from "react-native-vision-camera-barcodes-scanner";
import { API_URL, Delay } from '@utils/Cons';
import Icon from "react-native-vector-icons/MaterialIcons"
import { Shadow } from '@utils/StyleGlobal';
import { Worklets } from 'react-native-worklets-core';
import { useAppContext } from '@context/AppContext';
import axios from 'axios';
import LoadingModal from '@components/LoadingModal';

export default function CameraScreen({navigation}) {
  const {Token} = useAppContext()
  const device = useCameraDevice('back');
  const options = ["qr"]
  const {scanBarcodes} = useBarcodeScanner(options)
  const { hasPermission,requestPermission  } = useCameraPermission()
  const [active,setActive] = useState(true)
  const [Modals,setModals] = useState(false)
  const [FrameQr,setFrameQr] = useState({bottom:0,top:0,left:0,right:0,hight:0,width:0,border:0})


  const sendPresence = async (str) =>{
    try {
      setModals(!Modals)
      const Hadir = {
        status : "Hadir",
        latitude : "123459",
        longitude : "123456",
        desc : ""
      }
      const Pulang = {}
      const FormData = str.includes("presence-in") ? Hadir : Pulang;
      await axios.post(`${str}`,FormData,{headers:{Authorization: `Bearer ${Token}`}});
      navigation.reset({routes:[{name:"HomeScreen"}]})
    } catch (error) {
      setModals(!active)
      navigation.reset({routes:[{name:"HomeScreen"}]});
    }
  }

  const GetPermessionCamera = async() =>{
    try {
      await Delay(2000)
      await requestPermission()
    } catch (error) {
      console.log(error);
    }
  }
  
  const StyleFrame = {
    width:FrameQr.width,
    height:FrameQr.hight,
    borderWidth:FrameQr.border,
    borderColor:"white",
    position:"absolute",
    top:FrameQr.top,
    bottom:FrameQr.bottom,
    left:FrameQr.left,
    right:FrameQr.right,
    borderRadius:8
  }

  const setValueFrame = Worklets.createRunOnJS(setFrameQr)
  const SendDataPresence = Worklets.createRunOnJS(sendPresence)
  const cameraActive = Worklets.createRunOnJS(setActive)
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    const data = scanBarcodes(frame)
    if(data.length){
      const {bottom,top,left,right,height,width,rawValue} = data[0];
      setValueFrame({
        bottom:bottom,
        top:top+25,
        left:left-35,
        right:right + 35,
        hight:height + 20,
        width:width+20,
        border:2});
        if(rawValue.includes("presence-in")){
          cameraActive(false)
          SendDataPresence(rawValue);
        }else if (rawValue.includes("presence-out")){
          cameraActive(false)
          SendDataPresence(rawValue);
        }
    }else{
      setValueFrame({bottom:0,top:0,right:0,left:0,width:0,hight:0,border:0});
    }
    
  }, [])

  useEffect(()=>{
    GetPermessionCamera()
  },[])
  
  if(!hasPermission){
    return (
      <View className="bg-black flex-1 items-center justify-center">
        <View className="bg-white p-3 w-[80%] rounded-xl flex-row items-center justify-between">
          <Icon name="warning" size={25} color="black"/>
          <Text className="text-black">Izin Camera Diperlukan...</Text>
          <TouchableOpacity onPress={GetPermessionCamera} className="p-2 bg-white rounded-full" style={Shadow}>
            <Icon name="restart-alt" size={25} color="black"/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  return (
    <View>
      {
        device &&  
        <Camera
        className="w-[100%] h-[100%]"
        device={device}
        isActive={active}
        frameProcessor={frameProcessor}
        />
      }
      <View style={StyleFrame}>
      </View>
      <LoadingModal Visible={Modals}/>
    </View>
  )
}
