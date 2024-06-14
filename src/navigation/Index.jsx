import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@screen/SplashScreen';
import LoginScreen from '@screen/LoginScreen';
import RegisterScreen from '@screen/RegisterScreen';
import HomeScreen from '@screen/HomeScreen';
import CameraScreen from '@screen/CameraScreen';

const Stack = createStackNavigator()
const ScreenList = [
    {
        name : "SplashScreen",
        component : SplashScreen
    },
    {
        name : "LoginScreen",
        component : LoginScreen
    },
    {
        name : "RegisterScreen",
        component : RegisterScreen
    },
    {
        name : "HomeScreen",
        component : HomeScreen
    },
    {
        name : "CameraScreen",
        component : CameraScreen
    },
]

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown:false}}>
            {
                ScreenList.flatMap(({name,component},index)=>(
                    <Stack.Screen key={index} name={name} component={component} />
                ))
            }
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation