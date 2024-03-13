import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

export default function ChatRoomHeader({ user, router }) {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={hp(4)} color="#737373" />
            </TouchableOpacity>
            <View className="flex-row justify-center items-center gap-3">
              <Image
                source={user?.profileUrl}
                style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
              />
              <Text
                style={{ height: hp(2.5) }}
                className="text-neutral-500 font-bold"
              >
                {user?.username}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View className="flex-row items-center" style={{ gap: 20 }}>
            <Ionicons name="call" size={hp(2.8)} color={"#737373"} />
            <Ionicons name="videocam" size={hp(2.8)} color={"#737373"} />
          </View>
        ),
      }}
    />
  );
}
