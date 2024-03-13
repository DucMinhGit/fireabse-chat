import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

export default function Home() {
  const {logout, user} = useAuth();
  handleLogout = async() => {
    await logout();
  }
  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={handleLogout}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  )
}