import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { theme } from '../constants/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const BloodSugarAddScreen = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');

  const handleSave = () => {
    const num = parseInt(value, 10);
    if (num < 70) {
       Alert.alert(
         "UYARI", 
         "Lütfen 4-5 kesme şeker veya 150-200 ml meyve suyu alınız. Ardından ek bir ara öğün alınız. 15 dakika sonra kan şekerine bakınız. Normal sınırlara dönene kadar tekrarlayınız ve diyabet eğitimcinizden danışmanlık alınız.",
         [{ text: "OK", onPress: () => navigation.goBack() }]
       );
    } else {
       navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Input 
          label="Kan Şekeri Değeri"
          placeholder="Örn: 90"
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
        />
        <Button title="Kaydet" variant="blue" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.xl,
  },
});

export default BloodSugarAddScreen;
