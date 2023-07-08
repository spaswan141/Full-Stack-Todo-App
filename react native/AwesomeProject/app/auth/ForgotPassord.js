import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, toastConfig } from "../../style";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useForgotPasswordMutation } from "../../services/userAuthApi";

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const cleatInputs = () => {
    setEmail("");
  };
  const handleSubmit = async () => {
    if (email) {
      const formData = { email };
      const res = await forgotPassword(formData);
      if(!res.data.code){
        Toast.show({
          type: "done",
          position: "top",
          topOffset: 0,
          text1: 'Link has been successfully sent to your email. Please check your email',
        });
        cleatInputs();
        setTimeout(()=>{
          navigation.navigate("UserLogin")
        },3000)
      }else if(res.data.code === 202) {
        Toast.show({
          type: "warning",
          position: "top",
          topOffset: 0,
          text1: res.data.message,
        });
      } 
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
            <MaterialIcon
              name="supervised-user-circle"
              color="purple"
              size={100}
            />
          </View>
          <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter Your Email"
              keyboardType="email-address"
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
            <Button
              title="Send password link"
              onPress={handleSubmit}
              color="purple"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
