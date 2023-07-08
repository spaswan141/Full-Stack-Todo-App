import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/auth/Login";
import TodoTab from "./app/TodoTab";
import Signup from "./app/auth/Signup";
import ForgotPassword from "./app/auth/ForgotPassord";
import { Provider } from "react-redux";
import { store } from "./app/store";
import UserPanelTab from "./app/UserPanelTab";
const Stack= createNativeStackNavigator();

function App(){
  return (
   <NavigationContainer>
    <Stack.Navigator screenOptions={{headerStyle :{backgroundColor:'purple'}}}>
      <Stack.Screen name="TodoTab" component={TodoTab} options={{headerShown:false}}/>
      <Stack.Screen name="UserLogin" component={Login} options={{}}/>
      <Stack.Screen name="NewUser" component={Signup} options={{}}/>
      <Stack.Screen name="Forgot-Password" component={ForgotPassword} options={{}}/>
      <Stack.Screen name="UserPanelTab" component={UserPanelTab} options={{ headerShown: false }} />
    </Stack.Navigator>
   </NavigationContainer>
   
  )
}
export default()=>{
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}