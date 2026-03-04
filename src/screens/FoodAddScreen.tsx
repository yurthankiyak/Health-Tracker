import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';

const FoodAddScreen = () => {
  const [amount, setAmount] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Ayran</Text>
          <Ionicons name="chevron-down" size={20} color={theme.colors.lightText} />
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Besin Adı:</Text>
            <Text style={styles.value}>Ayran</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Kalorisi:</Text>
            <Text style={styles.value}>114 cal / 300 Cc</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ölçüm Birimi:</Text>
            <Text style={styles.value}>Cc</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ölçüm Açıklaması:</Text>
            <Text style={styles.value}>1,5 su bardağı = 300 ml</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Besin miktarını giriniz(Cc)"
            placeholderTextColor={theme.colors.lightText}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Listeye Kaydet" variant="blue" style={styles.saveBtn} onPress={() => {}} />
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
  },
  dropdown: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.xl,
  },
  dropdownText: {
    color: theme.colors.text,
  },
  infoCard: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.m,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: 130,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
  },
  value: {
    flex: 1,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  inputContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.xl,
  },
  input: {
    padding: theme.spacing.m,
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  saveBtn: {
    paddingHorizontal: 40,
  }
});

export default FoodAddScreen;
