import { View, Text, Platform } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { blurhash } from "../utils/common";
import { useAuth } from "../context/authContext";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { MenuItem } from "./CustomMenuItem";
import { AntDesign, Feather } from "@expo/vector-icons";

const android = Platform.OS === "android";

export default function HomeHeader() {
  const { top } = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const handleProfile = () => {};

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={{
        paddingTop: android ? top + 10 : top,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className="flex-row bg-indigo-500 shadow"
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
          Profile
        </Text>
      </View>

      <View>
        <Menu>
          <MenuTrigger>
            <Image
              style={{ height: hp(6), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileUrl}
              placeholder={blurhash}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: "continuous",
                marginTop: 50,
                marginLeft: -40,
                backgroundColor: "white",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 0 },
                width: 160,
              },
            }}
          >
            <MenuItem
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
            />
            <Divider />
            <MenuItem
              text="Logout"
              action={handleLogout}
              value={null}
              icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}

const Divider = () => {
  return (
    <View style={{ padding: 1, width: "100%" }} className="bg-neutral-100" />
  );
};
