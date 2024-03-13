import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "../utils/common";

export default function ChatItem({ item, router, noBorder }) {
  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };
  return (
    <View>
      <TouchableOpacity
        onPress={openChatRoom}
        style={[styles.item, noBorder && styles.showBorder]}
        className={`flex-row items-center`}
      >
        <Image
          style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
          source={item?.profileUrl}
          placeholder={blurhash}
          transition={500}
        />

        {/* name and last message */}
        <View className="flex-1 gap-1">
          <View
            style={{ justifyContent: "space-between" }}
            className="flex-row"
          >
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-neutral-500"
            >
              {item?.username}
            </Text>
            <Text
              style={{ fontSize: hp(1.6) }}
              className="font-medium text-neutral-500"
            ></Text>
          </View>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            Last message
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    justifyContent: "space-between",
    marginLeft: 4,
    marginRight: 4,
    gap: 2,
    marginBottom: 4,
    paddingBottom: 2,
  },

  showBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#c8ccd1",
  },
});
