import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ViewExpense from './screens/ViewExpense';
import AddExpense from './screens/AddExpense';
import Splash from './screens/Splash';

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          options={{headerShown: false}}
          component={Splash}
        />

        <Stack.Screen
          name="ViewExpense"
          options={{headerShown: false}}
          component={ViewExpense}
        />

        <Stack.Screen
          name="AddExpense"
          options={{headerShown: false}}
          component={AddExpense}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
