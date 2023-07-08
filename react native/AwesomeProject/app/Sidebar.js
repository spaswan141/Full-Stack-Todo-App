import { View, Text } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";
import { unSetUserInfo } from "../features/userSlice";
import { unsetUserToken } from "../features/authSlice";
import { removeToken } from "../services/AsyncStorageService";

const SideBar = ({ ...props }) => {
 const navigation = useNavigation();
 const myData = useSelector((state) => state.user);


  const handleLogout = async () => {
    unSetUserInfo({ name: "" });
    unsetUserToken({ token: null });
    await removeToken("token");
    navigation.navigate("Home");
  };

 

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ margin: 15 }}>
        <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: "bold" }}>
         {`Hello ${myData.name}`} 
        </Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
};

export default SideBar;
