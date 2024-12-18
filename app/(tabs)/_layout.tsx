import Colors from '@/constants/Colors';
import { FontAwesome, Ionicons, FontAwesome5 ,Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import {Text, View} from 'react-native';

export default function Layout(){
  return (
    <Tabs screenOptions={{
      tabBarStyle:{
        backgroundColor: Colors.bgcolor,
        borderTopWidth: 0,
        padding: 0
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: Colors.black,
      tabBarInactiveTintColor: '#999'
    }}>
      <Tabs.Screen name='index' options={{tabBarIcon: ({color}) => (
        <Ionicons name='compass' size={28} color={color} />
      )}}/>
      
       <Tabs.Screen name='customer' options={{tabBarIcon: ({color}) => (
        <FontAwesome5 name="street-view" size={28} color={color} />
       )}}/>
      
      <Tabs.Screen name='buyer' options={{tabBarIcon: ({color}) => (
        <Entypo name="aircraft-take-off" size={28} color={color} />
       )}}/>
  
      <Tabs.Screen name='profile'  options={{tabBarIcon: ({color}) => (
        <FontAwesome name="user" size={28} color={color} />
       )}}/>
    </Tabs>
  )
}
