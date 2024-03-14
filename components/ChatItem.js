import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash, formatDate, getRoomId } from "../utils/common";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ChatItem({ item, router, noBorder, currentUser }) {
  
  const [lastMessage, setLastMessage] = useState(undefined);

  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map(doc=> {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });

    return unsub;
  }, []);
  
  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };

  const renderTime = () => {
    if (lastMessage) {
      let date = lastMessage?.createdAt;
      return formatDate(new Date(date?.seconds * 1000));
    }
  }

  const renderLastMessage = () => {
    if (typeof lastMessage === 'undefined') return 'Loading...';
    if (lastMessage) {
      if (currentUser?.userId === lastMessage?.userId) return "You: " + lastMessage?.text;
      return lastMessage?.text;
    } else {
      return 'Say Hi';
    }
  }

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
            >
              { renderTime() }
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            {renderLastMessage()}
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
