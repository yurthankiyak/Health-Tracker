import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import Button from '../components/Button';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BloodSugarList'>;

const mockData = [
  {
    id: '1',
    meal: 'Sabah',
    status: 'Açlık',
    date: '05-03-2023',
    time: '16:58:00',
    glucoseValue: 60,
    insulinDose: '',
  }
];

const BloodSugarListScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const renderItem = ({ item }: { item: typeof mockData[0] }) => (
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
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="information-circle" size={24} color={theme.colors.buttonBlue} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
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
          <Text style={styles.dateText}>05-03-2023</Text>
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
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
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
