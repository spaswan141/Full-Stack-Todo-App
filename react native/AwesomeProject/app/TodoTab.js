
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from './todo/HomeScreen';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Drawer= createDrawerNavigator();

const TodoTab = () => {
const navigation= useNavigation()
  return (
  <Drawer.Navigator  screenOptions={{headerStyle :{backgroundColor:'purple'},headerTintColor:"white",drawerStyle:{backgroundColor:"#F0EDED"}}}>
    <Drawer.Screen name='Home' component={HomeScreen} options={{headerTitle:"My Todo" ,drawerActiveTintColor:'black',headerRight:()=><TouchableWithoutFeedback onPress={()=>navigation.navigate("UserLogin")}>
       <Text style={{color:'white',fontSize:20, fontWeight:'bold', paddingRight:20}}>Login</Text>
    </TouchableWithoutFeedback>}}/>
  </Drawer.Navigator> 
  )
}

export default TodoTab