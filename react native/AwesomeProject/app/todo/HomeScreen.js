import { View, Text,Dimensions, Button } from 'react-native'
import React from 'react'

import Image from 'react-native-scalable-image';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{paddingLeft:20,paddingRight:20}}>
      <Text style={{fontSize:60,fontWeight:'bold',color:'purple',marginLeft:5}}>Welcome To My Todo App</Text>
      <Image width={Dimensions.get('window').width}
         source={require('../../assets/pc.png')}
      />
    <Button style={{width:30}} title="Login" onPress={()=>{navigation.navigate("UserLogin")}} color="purple" />
    </View>
  )
}

export default HomeScreen