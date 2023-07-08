import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, toastConfig } from "../../style";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useRegisterUserMutation } from "../../services/userAuthApi";

const Signup = () => {
 const [registerUser]=useRegisterUserMutation()
 const navigation=useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName]=useState('');
  const [age,setAge]=useState('')
  const cleatInputs = () => {
    setEmail("");
    setPassword("");
    setAge('');
    setName("")
  };
  const handleSubmit =async() => {
    if (email && password) {
      const formData = {email,password,name,age};
      const res=await registerUser(formData)
      if(res.data.code===201){
        Toast.show({
          type: "done",
          position: "top",
          topOffset: 0,
          text1: "User has been registered successfully",
        });
        cleatInputs();
        navigation.navigate("UserLogin")
      }else{
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
            <MaterialIcon name="supervised-user-circle"  color="purple" size={100} />
          </View>
          <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
            <Text style={styles.labelText}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(newText) => setName(newText)}
              placeholder="Enter Your Full Name"
            />
          </View>
          <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
            <Text style={styles.labelText}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={(newText) => setAge(newText)}
              placeholder="Enter Your Age"
              keyboardType="number-pad"
            />
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
            <Button title="Sign Up" onPress={handleSubmit} color="purple" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
