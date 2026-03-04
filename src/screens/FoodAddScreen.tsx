import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Picker } from '@react-native-picker/picker';
import { FOOD_LIST, FoodItem } from '../constants/foods';
import { useAppStore } from '../store/useAppStore';

type FoodAddRouteProp = RouteProp<RootStackParamList, 'FoodAdd'>;

const FoodAddScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<FoodAddRouteProp>();
  const [selectedFoodName, setSelectedFoodName] = useState(FOOD_LIST[0].name);
  const [amount, setAmount] = useState('');
  
  // These are passed from NutritionFormScreen or assumed
  const week = '1'; // Defaulting for now if not passed
  const meal = 'Sabah'; // Defaulting

  const addFoodToMeal = useAppStore(state => state.addFoodToMeal);
  const nutritionRecords = useAppStore(state => state.nutritionRecords);

  const selectedFood = useMemo(() => 
    FOOD_LIST.find(f => f.name === selectedFoodName) || FOOD_LIST[0]
  , [selectedFoodName]);

  const currentMealRecord = useMemo(() => {
    const date = new Date().toLocaleDateString('tr-TR').replace(/\./g, '-');
    return nutritionRecords.find(r => r.week === week && r.meal === meal && r.date === date);
  }, [nutritionRecords, week, meal]);

  const calculatedCalories = useMemo(() => {
    const amt = parseFloat(amount);
    if (isNaN(amt)) return 0;
    return (amt * selectedFood.caloriesPerUnit) / 100; // Assuming 100 unit base
  }, [amount, selectedFood]);

  const handleSave = () => {
    const amt = parseFloat(amount);
    if (!amount || isNaN(amt)) {
      Alert.alert("Hata", "Lütfen geçerli bir miktar giriniz.");
      return;
    }

    addFoodToMeal(week, meal, {
      name: selectedFood.name,
      amount: amount,
      unit: selectedFood.unit,
      calories: calculatedCalories
    });

    setAmount('');
    Alert.alert("Başarılı", \\ listeye eklendi.\);
  };

  const removeFoodFromMeal = useAppStore(state => state.removeFoodFromMeal);

  const renderFoodItem = ({ item }: { item: any }) => (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.listItemName}>{item.name}</Text>
        <Text style={styles.listItemDetail}>{item.amount} {item.unit} - {item.calories.toFixed(1)} cal</Text>
      </View>
      <TouchableOpacity onPress={() => removeFoodFromMeal(currentMealRecord!.id, item.id)}>
        <Ionicons name="close-circle" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.sectionLabel}>Besin Seçiniz:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedFoodName}
            onValueChange={(itemValue) => setSelectedFoodName(itemValue)}
          >
            {FOOD_LIST.map(food => (
              <Picker.Item key={food.name} label={food.name} value={food.name} />
            ))}
          </Picker>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Besin Adı:</Text>
            <Text style={styles.value}>{selectedFood.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ölçüm Birimi:</Text>
            <Text style={styles.value}>{selectedFood.unit}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bilgi:</Text>
            <Text style={styles.value}>{selectedFood.description}</Text>
          </View>
        </View>

        <View style={styles.inputSection}>
          <TextInput 
            style={styles.input}
            placeholder={\Miktar giriniz (\)\}
            placeholderTextColor="#999"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <Text style={styles.calHint}>Yaklaşık: {calculatedCalories.toFixed(1)} cal</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Listeye Kaydet" variant="blue" onPress={handleSave} style={styles.saveBtn} />
        </View>

        <View style={styles.listSection}>
          <Text style={styles.listHeader}>Eklenen Besinler (Bu Öğün İçin)</Text>
          <FlatList 
            data={currentMealRecord?.foods || []}
            keyExtractor={item => item.id}
            renderItem={renderFoodItem}
            ListEmptyComponent={<Text style={styles.emptyText}>Henüz besin eklenmedi.</Text>}
            style={styles.list}
          />
          {currentMealRecord && (
            <Text style={styles.totalCal}>Toplam: {currentMealRecord.totalCalories.toFixed(1)} cal</Text>
          )}
        </View>

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
  sectionLabel: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.m,
    overflow: 'hidden',
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.m,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  value: {
    flex: 1,
    color: '#333',
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  input: {
    backgroundColor: 'white',
    flex: 1,
    padding: 12,
    borderRadius: theme.borderRadius.s,
    fontSize: 16,
  },
  calHint: {
    marginLeft: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  saveBtn: {
    width: '100%',
  },
  listSection: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: theme.borderRadius.s,
    padding: 10,
  },
  listHeader: {
    color: 'white',
    fontWeight: 'bold',
    borderBottomWidth:1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    marginBottom: 10,
    paddingBottom: 5,
  },
  list: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  listItemName: {
    fontWeight: 'bold',
    color: '#333',
  },
  listItemDetail: {
    color: '#666',
    fontSize: 12,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginTop: 20,
  },
  totalCal: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  }
});

export default FoodAddScreen;
