import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'NutritionForm'>;

const NutritionFormScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [week, setWeek] = useState('Gebelik Haftasını Seçiniz');
  const [meal, setMeal] = useState('Sabah');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Gebelik Haftasını Seçiniz:</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>{week}</Text>
          <Ionicons name="chevron-down" size={20} color={theme.colors.lightText} />
        </TouchableOpacity>

        <Text style={styles.label}>Öğünü Seçiniz:</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>{meal}</Text>
          <Ionicons name="chevron-down" size={20} color={theme.colors.lightText} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('FoodAdd')}
        >
          <Text style={styles.buttonText}>Besin Seçimine Git</Text>
          <Ionicons name="arrow-forward" size={20} color={theme.colors.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Besinlerden Alınan Toplam Kalori: 80.50 cal</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  content: {
    padding: theme.spacing.m,
    flex: 1,
  },
  label: {
    color: '#F9Dada',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600'
  },
  dropdown: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  dropdownText: {
    color: theme.colors.text,
  },
  button: {
    backgroundColor: '#FF9800', // Orange button from screenshot
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.s,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: theme.colors.background,
    fontWeight: 'bold',
    marginRight: 8,
  },
  footer: {
    padding: theme.spacing.m,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  footerText: {
    color: theme.colors.background,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default NutritionFormScreen;
