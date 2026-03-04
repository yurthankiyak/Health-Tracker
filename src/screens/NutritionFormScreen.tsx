import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'NutritionForm'>;

const NutritionFormScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [week, setWeek] = useState('1');
  const [meal, setMeal] = useState('Sabah');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Gebelik Haftasını Seçiniz:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={week}
            onValueChange={(itemValue) => setWeek(itemValue)}
            style={styles.picker}
            dropdownIconColor={theme.colors.lightText}
          >
            {[...Array(40).keys()].map(i => (
              <Picker.Item key={i} label={`${i + 1}. Hafta`} value={String(i + 1)} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Öğünü Seçiniz:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={meal}
            onValueChange={(itemValue) => setMeal(itemValue)}
            style={styles.picker}
            dropdownIconColor={theme.colors.lightText}
          >
            <Picker.Item label="Sabah" value="Sabah" />
            <Picker.Item label="Öğle" value="Öğle" />
            <Picker.Item label="Akşam" value="Akşam" />
            <Picker.Item label="Ara Öğün 1" value="Ara 1" />
            <Picker.Item label="Ara Öğün 2" value="Ara 2" />
          </Picker>
        </View>

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
  pickerContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.l,
    overflow: 'hidden',
  },
  picker: {
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
