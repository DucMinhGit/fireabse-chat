import { View, Text, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import ChatList from '../../components/ChatList';
import Loading from '../../components/Loading';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';

export default function Home() {
  const {logout, user} = useAuth();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    if(user?.uid) getUsers();
  });
  
  const getUsers = async () => {
    const q = query(usersRef, where('userId', '!=', user?.uid));
    const querySnapShot = await getDocs(q);
    let data = [];
    querySnapShot.forEach(doc => {
      data.push({...doc.data()});
    });

    setUsers(data);
  };

  handleLogout = async() => {
    await logout();
  };
  
  return (
    <View className="flex-1 bg-white">
      <StatusBar style='light' />
      {
        users?.length > 0 ? (
          <ChatList currentUser={user} users={users} />
        ) : (
          <View className="flex items-center" style={{top: hp(30)}}>
            <Loading size={hp(10)} /> 
          </View>
        )
      }
    </View>
  )
}