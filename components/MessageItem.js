import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MessageItem({ message, currentUser }) {
  if (currentUser?.userId === message?.userId) {
    return (
      <View
        style={{
          justifyContent: "flex-end",
          marginBottom: 12,
          marginRight: 12,
        }}
        className="flex-row"
      >
        <View style={{ width: wp(80) }}>
          <View
            style={[styles.myMessage]}
            className="flex bg-white border-neutral-500"
          >
            <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          justifyContent: "flex-start",
          marginLeft: 12,
          marginBottom: 12,
        }}
        className="flex-row"
      >
        <View style={{ width: wp(80) }}>
          <View
            style={[styles.friendsMessage]}
            className="flex bg-indigo-500 border-indigo-500"
          >
            <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  myMessage: {
    alignSelf: "flex-end",
    padding: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F8F8F8",
  },
  friendsMessage: {
    alignSelf: "flex-start",
    padding: 12,
    borderRadius: 24,
  },
});
