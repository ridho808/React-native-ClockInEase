import { Alert, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '@components/Container'
import InputText from '@components/InputText'
import InputPicker from '@components/InputPicker'
import InputPassword from '@components/InputPassword'
import ButtonYellow from '@components/ButtonYellow'
import ButtonGreen from '@components/ButtonGreen'
import axios from 'axios'
import { API_URL } from '@utils/Cons'
import ServerApi from '@api/Http'

export default function RegisterScreen({navigation}) {
  const [formData,setFormData] = useState({
    name : "",
    gender : "",
    email : "",
    phone_number: "",
    password :"",
    division : "",
    dapartment : "",
    branch : "",
    position : "",
    device_model : "8080808080280"
  })
  const [Division,setDivision] = useState([]);
  const [Dapartment,setDapartment] = useState([]);
  const [Branch,setBranch] = useState([]);
  const [visible,setVisible] = useState(true)
  const Gender = [{label : "Pria",value:"Pria"},{label:"Wanita",value:"Wanita"}]
  const Position = [{label : "Staff",value:"Staff"},{label:"Manager",value:"Manager"},{label : "Supervisor",value:"Supervisor"}]
  const URL = ServerApi();

  const changeName = (name)=>setFormData((Prev)=>({...Prev,name : name}))
  const changeGender = (gender)=>setFormData((prev)=>({...prev,gender: gender}))
  const changeEmail = (email)=>setFormData((prev)=>({...prev,email : email}))
  const changePhone = (phone_number)=>setFormData((prev)=>({...prev,phone_number:phone_number}))
  const changeDapartment = (value) => setFormData((prev)=>({...prev,dapartment:value}))
  const changeBranch = (value) => setFormData((prev)=>({...prev,branch:value}))
  const changePosition = (value)=> setFormData((prev)=>({...prev,position : value})); 
  const changePassword = (value)=> setFormData((prev)=>({...prev,password : value})); 
  
  const getDivision = async () =>{
    try {
        const {data} = await axios.get(API_URL + "/getAllDivision");
        const division = data.flatMap(({name,id})=>({label:name,value:name,id:id}));
        setDivision(division);
    } catch (error) {
        console.log("getDivision",error);
    }
  }

  const getBranch = async() =>{
    try {
        const {data} = await axios.get(API_URL + "/branches")
        const branch = data.flatMap(({name,id})=>({label:name,value:name,id:id}))
        setBranch(branch)
    } catch (error) {
        console.log(error);
    }
  }

  const ChangeDivision = async (value) =>{
    try {
        setFormData((prev)=>({...prev,division: value}))
        if(!value) return setDapartment([{label:"Belum Tersedia",value:"Belum Tersedia"}])
        const index = Division.findIndex((key)=> key.label === value)
        const id = Division[index].id
        const {data} = await axios.get(API_URL+`/getDepartment/${id}`)
        if(!data.length){
            setDapartment([{label : data.data,value : data.data,id:0}])
            return;
        }
        const dapartemen = data.flatMap(({name,id})=>({label:name,value:name,id:id}))
        setDapartment(dapartemen);
    } catch (error) {
        console.log("get2",error.message);
    }
  }

  const RegisAccount = async() =>{
    try {
        const {data} = await URL.post(API_URL + "/register",formData);
        Alert.alert("Success mendaftar",data.message);
        navigation.reset({routes:[{name:"LoginScreen"}]})
    } catch (error) {
        console.log(error.response);
        Alert.alert("Gagal Mendaftar","Periksa formulir apakah sudah benar ?")
    }
  }

  useEffect(()=>{
    getDivision();
    getBranch();
  },[]);

  return (
        <Container classname={"flex-1 items-center justify-center"}>
            <ScrollView showsVerticalScrollIndicator={false} className="w-full">
                <Text className="text-2xl font-bold text-center text-black">Daftar</Text>
                <InputText Value={formData.name} Event={changeName} Title={"Nama Lengkap"} icon={"person-pin"} size={25} Placeholder={"Masukkan nama..."}/>
                <InputPicker OnvalueChange={changeGender} Items={Gender} icon={"person-half-dress"} Title={"Pilih Gender"}/>
                <InputText Value={formData.phone_number} Type={"numeric"} Title={"Nomor Telpon"} Event={changePhone} icon={"phone"} size={20} Placeholder={"08727162364"}/>
                <InputText Value={formData.email} Title={"Email"} Event={changeEmail} icon={"email"} size={20} Placeholder={"contoh@gmail.com"}/>
                <InputPassword ShownPass={visible} EventPass={()=>setVisible(false)} Value={formData.password} Event={changePassword} icon={"lock"} Placeholder={"Kata Sandi...."} Title={"Password"}/>
                <InputPicker OnvalueChange={ChangeDivision} Items={Division} icon={"building-user"} size={18} Title={"Pilih Divisi"}/>
                <InputPicker OnvalueChange={changeDapartment} Items={Dapartment} icon={"building-columns"} size={18} Title={"Pilih Dapartemen"}/>
                <InputPicker OnvalueChange={changeBranch} Items={Branch} icon={"diagram-project"} size={18} Title={"Pilih Cabang"}/>
                <InputPicker OnvalueChange={changePosition} Items={Position} icon={"user-group"} size={18} Title={"Pilih Jabatan"}/>
                <View className="h-[110px] items-center justify-center">
                    <ButtonYellow Event={RegisAccount} Title={"Daftar"}/>
                    <ButtonGreen Event={()=>navigation.navigate("LoginScreen")} Title={"Kembali"}/>
                </View>
            </ScrollView>
        </Container>
  )
}