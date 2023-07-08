
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideBar from './Sidebar';
import DashboardScreen from './DashboardScree';


const Drawer = createDrawerNavigator();
const UserPanelTab = () => {
  return (
    <Drawer.Navigator drawerContent={props => <SideBar {...props} />} screenOptions={{ headerStyle: { backgroundColor: 'purple' }, headerTintColor: 'white' }}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    </Drawer.Navigator>
  )
}

export default UserPanelTab