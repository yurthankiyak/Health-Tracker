import ActivityAddScreen from '../screens/ActivityAddScreen';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import MainMenuScreen from '../screens/MainMenuScreen';
import DailyGoalsScreen from '../screens/DailyGoalsScreen';
import BloodSugarListScreen from '../screens/BloodSugarListScreen';
import BloodSugarAddScreen from '../screens/BloodSugarAddScreen';
import NutritionFormScreen from '../screens/NutritionFormScreen';
import FoodAddScreen from '../screens/FoodAddScreen';

export type RootStackParamList = {
  Login: undefined;
  MainMenu: undefined;
  DailyGoals: undefined;
  BloodSugarList: undefined;
  BloodSugarAdd: undefined;
  NutritionForm: undefined;
  ActivityAdd: undefined;
  FoodAdd: { week: string; meal: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#F05C5C' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ title: 'Formlar', headerBackVisible: false }} />
        <Stack.Screen name="DailyGoals" component={DailyGoalsScreen} options={{ title: 'Günlük Hedefler' }} />
        <Stack.Screen name="BloodSugarList" component={BloodSugarListScreen} options={{ title: 'Kan Şekeri İzlemlerim' }} />
        <Stack.Screen name="BloodSugarAdd" component={BloodSugarAddScreen} options={{ title: 'Kan Şekeri Ekle', presentation: 'formSheet' }} />
        <Stack.Screen name="ActivityAdd" component={ActivityAddScreen} options={{ title: 'Aktivite Ekle', presentation: 'modal' }} />
        <Stack.Screen name="NutritionForm" component={NutritionFormScreen} options={{ title: 'Beslenme Ekleme Formu' }} />
        <Stack.Screen name="FoodAdd" component={FoodAddScreen} options={{ title: 'Besin Ekleme' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


