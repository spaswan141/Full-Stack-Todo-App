import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "../features/authSlice";
import { setUserInfo } from "../features/userSlice";
import { useAddTodoMutation, useGetLoggedUserQuery, useGetTodoQuery } from "../services/userAuthApi";
import { getToken } from "../services/AsyncStorageService";
import { styles } from "../style";


const DashboardScreen = () => {
  const [addTodo]=useAddTodoMutation();
  const [text, setTodoText] = useState("");
  const [todoData,setTodoData]=useState([])
  const myData = useSelector((state) => state.user);
  const [userLToken, setUserLToken] = useState();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setUserLToken(token);
      dispatch(setUserToken({ token: token }));
    })();
  });
  const cleatInputs=()=>{
    setTodoText("")
  }
//   useEffect(()=>{
//     (async () => {
//         const token = await getToken();
//         const res= await getTodo(token)
//       })();
//   },[])
  const handleSubmit = async () => {
    if (text) {
        const token = await getToken();
       const formData={text}
       await addTodo(formData,token).then(()=>{

       }).catch((err)=>{console.log(err)})
       console.log(res);
       if(res.data.token){
        Toast.show({
          type: "done",
          position: "top",
          topOffset: 0,
          text1: res.data.message,
        });
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
  const { data, isSuccess } = useGetLoggedUserQuery(userLToken);
  const todoDatas=useGetTodoQuery(userLToken)
  console.log(todoData)
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo({ email: data.email, name: data.name }));
    }
  });
  return (
    <View>
      <View>
        <Text
          style={{ fontSize: 50, marginLeft: 5, marginBottom: 10 }}
        >{`Hello ${myData.name}`}</Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 50,
            marginLeft: 5,
            alignSelf: "center",
            color: "purple",
            marginTop: 10,
          }}
        >
          Todo App
        </Text>
      </View>

      <View style={[styles.inputWithLabel, { flexDirection: "row" }]}>
        <TextInput
          style={[styles.input, { width: "80%", marginLeft: 10 }]}
          value={text}
          onChangeText={(newText) => setTodoText(newText)}
          placeholder="Enter Todo....."
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.roundButton1}
        >
          <Text style={{color:"white",}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardScreen;
