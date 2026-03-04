import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import Button from '../components/Button';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BloodSugarList'>;

export interface BloodSugarRecord {
  id: string;
  meal: string;
  status: string;
  date: string;
  time: string;
  glucoseValue: number;
  insulinDose: string;
}

const initialData: BloodSugarRecord[] = [
  {
    id: '1',
    meal: 'Sabah',
    status: 'Açlık',
    date: new Date().toLocaleDateString('tr-TR').replace(/\./g, '-'),
    time: '16:58:00',
    glucoseValue: 60,
    insulinDose: '',
  }
];

const BloodSugarListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<BloodSugarRecord[]>(initialData);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Sil",
      "Bu kaydı silmek istediğinize emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        { text: "Sil", style: "destructive", onPress: () => setData(data.filter(item => item.id !== id)) }
      ]
    );
  };

  const handleInfo = () => {
    Alert.alert("Bilgi Merkezi", "Bu alanda beslenme veya insülin detayları görüntülenir.");
  }

  const currentDate = new Date().toLocaleDateString('tr-TR').replace(/\./g, '-');

  const renderItem = ({ item }: { item: BloodSugarRecord }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.rowText}><Text style={styles.label}>Öğünü:</Text> {item.meal}</Text>
          <Text style={styles.rowText}><Text style={styles.label}>Açlık Durumu:</Text> {item.status}</Text>
          <Text style={styles.rowText}><Text style={styles.label}>Tarih:</Text> {item.date}</Text>
          <Text style={styles.rowText}><Text style={styles.label}>Saat:</Text> {item.time}</Text>
          <Text style={styles.rowText}><Text style={styles.label}>Kan Şekeri Değeri:</Text> {item.glucoseValue}</Text>
          <Text style={styles.rowText}><Text style={styles.label}>İnsülin Dozu:</Text> {item.insulinDose}</Text>
        </View>
        <View style={styles.actionsContainer}>
          <View style={styles.avatarPlaceholder} />
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconButton} onPress={handleInfo}>
              <Ionicons name="information-circle" size={24} color={theme.colors.buttonBlue} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.datePicker}>
          <Text style={styles.dateText}>{currentDate}</Text>
          <Ionicons name="calendar" size={20} color={theme.colors.background} />
        </View>
        <Button 
          title="Ekle" 
          variant="blue" 
          style={styles.addButton} 
          textStyle={styles.addButtonText}
          onPress={() => navigation.navigate('BloodSugarAdd')} 
        />
      </View>
      
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={{textAlign: 'center', color: 'white', marginTop: 20}}>Henüz kayıt bulunmamaktadır.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: theme.colors.background,
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold',
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.s,
  },
  addButtonText: {
    fontSize: 14,
  },
  listContent: {
    padding: theme.spacing.m,
  },
  card: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: theme.borderRadius.m,
    padding: 12,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  rowText: {
    fontSize: 12,
    color: theme.colors.text,
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  actionsContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 60,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFE0E0',
    marginBottom: 8,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  iconButton: {
    marginLeft: 8,
  }
});

export default BloodSugarListScreen;
