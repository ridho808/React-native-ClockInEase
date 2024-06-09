import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@screen/SplashScreen';
import LoginScreen from '@screen/LoginScreen';

const Stack = createStackNavigator()
const ScreenList = [
    {
        name : "SplashScreen",
        component : SplashScreen
    },
    {
        name : "LoginScreen",
        component : LoginScreen
    }
]


const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
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