import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useAppStore } from '../store/useAppStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'NutritionForm'>;

const NutritionFormScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [week, setWeek] = useState('1');
  const [meal, setMeal] = useState('Sabah');
  const nutritionRecords = useAppStore(state => state.nutritionRecords);

  const currentMealRecord = useMemo(() => {
    const date = new Date().toLocaleDateString('tr-TR').replace(/\./g, '-');
    return nutritionRecords.find(r => r.week === week && r.meal === meal && r.date === date);
  }, [nutritionRecords, week, meal]);

  const removeFoodFromMeal = useAppStore(state => state.removeFoodFromMeal);

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

        <View style={styles.summaryContainer}>
           <Text style={styles.summaryTitle}>Eklenen Besinler:</Text>
           <FlatList 
             data={currentMealRecord?.foods || []}
             keyExtractor={item => item.id}
             renderItem={({item}) => (
               <View style={styles.foodRow}>
                 <Text style={styles.foodText}>{item.name} ({item.amount} {item.unit})</Text>
                 <Text style={styles.foodCal}>{item.calories.toFixed(1)} cal</Text>
                 <TouchableOpacity onPress={() => removeFoodFromMeal(currentMealRecord!.id, item.id)}>
                   <Ionicons name="trash-outline" size={18} color="red" />
                 </TouchableOpacity>
               </View>
             )}
             ListEmptyComponent={<Text style={styles.emptyText}>Bu öğün için henüz besin eklenmedi.</Text>}
             style={styles.foodList}
           />
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
        <Text style={styles.footerText}>
          Öğün Toplamı: {currentMealRecord?.totalCalories.toFixed(2) || '0.00'} cal
        </Text>
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
    marginBottom: theme.spacing.m,
    overflow: 'hidden',
  },
  picker: {
    color: theme.colors.text,
  },
  summaryContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: theme.borderRadius.s,
    padding: 10,
    marginBottom: 15,
  },
  summaryTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)'
  },
  foodList: {
    flex: 1,
  },
  foodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 8,
    borderRadius: 6,
  },
  foodText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  foodCal: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 13,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.s,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center'
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
