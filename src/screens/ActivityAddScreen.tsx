import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert, Switch, ScrollView } from 'react-native';
import { theme } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store/useAppStore';
import Button from '../components/Button';
import { Picker } from '@react-native-picker/picker';

const ACTIVITY_TYPES = ['Yürüyüş', 'Yüzme', 'Yoga', 'Pilates', 'Hafif Egzersiz', 'Diğer'];

const ActivityAddScreen = () => {
  const navigation = useNavigation();
  const [type, setType] = useState(ACTIVITY_TYPES[0]);
  const [customType, setCustomType] = useState('');
  const [duration, setDuration] = useState('');
  const [isDone, setIsDone] = useState(true);
  const addActivity = useAppStore(state => state.addActivity);

  const handleSave = () => {
    const finalType = type === 'Diğer' ? customType : type;
    
    if (type === 'Diğer' && !customType.trim()) {
      Alert.alert("Hata", "Lütfen aktivite adını yazınız.");
      return;
    }
    
    if (!duration) {
      Alert.alert("Hata", "Lütfen süreyi giriniz.");
      return;
    }

    addActivity({
      type: finalType,
      duration: duration + ' Dakika',
      isDone
    });

    Alert.alert("Başarılı", "Aktivite listeye eklendi.", [
      { text: "Tamam", onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Aktivite Türü:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            {ACTIVITY_TYPES.map(a => (
              <Picker.Item key={a} label={a} value={a} />
            ))}
          </Picker>
        </View>

        {type === 'Diğer' && (
          <View>
            <Text style={styles.label}>Aktivite Adı:</Text>
            <TextInput
              style={styles.input}
              placeholder="Aktiviteyi yazınız..."
              value={customType}
              onChangeText={setCustomType}
              autoFocus
            />
          </View>
        )}

        <Text style={styles.label}>Süre (Dakika):</Text>
        <TextInput
          style={styles.input}
          placeholder="Örn: 30"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />

        <View style={styles.switchRow}>
          <Text style={styles.label}>Tamamlandı mı?</Text>
          <Switch
            value={isDone}
            onValueChange={setIsDone}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={isDone ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        <Button title="Listeye Kaydet" variant="blue" onPress={handleSave} style={{ marginTop: 20 }} />
      </ScrollView>
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: theme.borderRadius.s,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: theme.borderRadius.s,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  }
});

export default ActivityAddScreen;
