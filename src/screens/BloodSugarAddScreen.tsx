import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert, Text } from 'react-native';
import { theme } from '../constants/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store/useAppStore';
import { Picker } from '@react-native-picker/picker';

const BloodSugarAddScreen = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [meal, setMeal] = useState('Sabah');
  const [status, setStatus] = useState('Açlık');
  const [insulin, setInsulin] = useState('');
  const addBloodSugar = useAppStore(state => state.addBloodSugar);

  const handleSave = () => {
    const num = parseInt(value, 10);
    if (!value || isNaN(num)) {
      Alert.alert("Hata", "Lütfen geçerli bir kan şekeri değeri girin.");
      return;
    }

    addBloodSugar({
      glucoseValue: num,
      meal,
      status,
      insulinDose: insulin || '-',
    });

    if (num < 70) {
       Alert.alert(
         "DÜŞÜK ŞEKER UYARISI!", 
         "Lütfen kan şekeriniz çok düşük. 4-5 kesme şeker veya 150-200 ml meyve suyu alınız. 15 dakika sonra kan şekerine tekrar bakınız. Ve diyabet eğitimcinizden danışmanlık alınız.",
         [{ text: "Tamam", onPress: () => navigation.goBack() }]
       );
    } else if (num > 140 && status === 'Tokluk') {
       Alert.alert(
         "YÜKSEK ŞEKER UYARISI!", 
         "Tokluk şekeriniz yüksek çıktı. Lütfen diyetinize dikkat edin ve doktorunuza danışın.",
         [{ text: "Tamam", onPress: () => navigation.goBack() }]
       );
    } else {
       Alert.alert("Başarılı", "Kayıt eklendi.", [{ text: "Tamam", onPress: () => navigation.goBack() }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.label}>Öğün:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={meal}
            onValueChange={(itemValue) => setMeal(itemValue)}
          >
            <Picker.Item label="Sabah" value="Sabah" />
            <Picker.Item label="Öğle" value="Öğle" />
            <Picker.Item label="Akşam" value="Akşam" />
            <Picker.Item label="Ara Öğün 1" value="Ara 1" />
            <Picker.Item label="Ara Öğün 2" value="Ara 2" />
          </Picker>
        </View>

        <Text style={styles.label}>Durum:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="Açlık" value="Açlık" />
            <Picker.Item label="Tokluk" value="Tokluk" />
          </Picker>
        </View>

        <Input 
          label="Kan Şekeri Değeri (mg/dL)"
          placeholder="Örn: 90"
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
        />

        <Input 
          label="İnsülin Dozu (İsteğe Bağlı)"
          placeholder="Örn: 5 Ünite (Veya boş bırakın)"
          value={insulin}
          onChangeText={setInsulin}
        />

        <Button title="Kaydet" variant="blue" onPress={handleSave} style={{marginTop: 20}} />
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
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  pickerContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.l,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
});

export default BloodSugarAddScreen;
