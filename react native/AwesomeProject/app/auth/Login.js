import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, toastConfig } from "../../style";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useLoginUserMutation } from "../../services/userAuthApi";
import { storeToken } from "../../services/AsyncStorageService";


const Login = () => {
  const [loginUser]=useLoginUserMutation()
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cleatInputs = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async () => {
    if (email && password) {
    
       const formData={email,password}
       const res= await loginUser(formData)
       if(res.data.token){
        Toast.show({
          type: "done",
          position: "top",
          topOffset: 0,
          text1: res.data.message,
        });
        await storeToken(res.data.token) 
        navigation.navigate("UserPanelTab")
       }else{
        Toast.show({
          type: "warning",
          position: "top",
          topOffset: 0,
          text1: res.data.message,
        });
       }
      
      cleatInputs();
   
    } else {
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        text1: "All Fields Are Required",
      });
    }
  };
  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginHorizontal: 30 }}>
          <View>
            <MaterialIcon name="login" color="purple" size={100} />
          </View>
          <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(newText) => setEmail(newText)}
              placeholder="Enter Your Email"
              keyboardType="email-address"
            />
          </View>
          <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(newText) => setPassword(newText)}
              placeholder="Enter Your Password"
              secureTextEntry={true}
            />
          </View>
          <View
            style={{
              width: 200,
              alignSelf: "center",
              margin: 20,
              borderRadius: 50,
            }}
          >
            <Button title="Sign In" onPress={handleSubmit} color="purple" />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Forgot-Password");
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("NewUser");
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  New User ? Registration
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
