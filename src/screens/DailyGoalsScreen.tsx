import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAppStore, ActivityRecord } from '../store/useAppStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DailyGoals'>;

const DailyGoalsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { activityRecords, removeActivity, toggleActivityDone } = useAppStore();

  const handleDelete = (id: string) => {
    Alert.alert(
      "Sil",
      "Bu aktiviteyi silmek istediğinize emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        { text: "Sil", style: "destructive", onPress: () => removeActivity(id) }
      ]
    );
  };

  const currentDay = new Date().toLocaleDateString('tr-TR').replace(/\./g, '-');

  const renderActivityItem = ({ item }: { item: ActivityRecord }) => (
    <Card style={[styles.card, { borderLeftColor: item.isDone ? '#4CAF50' : '#FF9800' }]}>
      <View style={styles.cardHeader}>
        <View style={styles.typeRow}>
          <Ionicons 
            name={item.type === 'Yürüyüş' ? 'walk' : 'fitness'} 
            size={20} 
            color={theme.colors.primary} 
          />
          <Text style={styles.activityType}>{item.type}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Süre:</Text>
          <Text style={styles.infoValue}>{item.duration}</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Tarih/Saat:</Text>
          <Text style={styles.infoValue}>{item.date} {item.time}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity 
          style={[styles.statusBadge, { backgroundColor: item.isDone ? '#E8F5E9' : '#FFF3E0' }]}
          onPress={() => toggleActivityDone(item.id)}
        >
          <Ionicons 
            name={item.isDone ? 'checkmark-circle' : 'time-outline'} 
            size={16} 
            color={item.isDone ? '#4CAF50' : '#EF6C00'} 
          />
          <Text style={[styles.statusText, { color: item.isDone ? '#2E7D32' : '#E65100' }]}>
            {item.isDone ? 'Yapıldı' : 'Yapılmadı'}
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  const ListHeader = () => (
    <View style={styles.infoSection}>
      <View style={styles.infoBox}>
        <Ionicons name="information-circle-outline" size={24} color={theme.colors.background} />
        <Text style={styles.infoBoxText}>
          Hekiminiz aksini belirtmedikçe haftada en az 3 gün 20-30 dakika hafif tempolu yürüyüş yapmanız önerilir.
        </Text>
      </View>
      <View style={styles.listHeaderRow}>
        <Text style={styles.listTitle}>Aktivite Geçmişim</Text>
        <Text style={styles.todayText}>{currentDay}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>Fiziksel Aktivite Takibi</Text>
        <Button 
          title="Aktivite Ekle" 
          variant="blue" 
          onPress={() => navigation.navigate('ActivityAdd' as any)} 
          style={styles.addButton}
          textStyle={{ fontSize: 13 }}
        />
      </View>

      <FlatList
        data={activityRecords}
        keyExtractor={item => item.id}
        renderItem={renderActivityItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bicycle-outline" size={60} color="rgba(255,255,255,0.3)" />
            <Text style={styles.emptyText}>Henüz kaydedilmiş bir aktivite yok.</Text>
          </View>
        }
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
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  listContent: {
    padding: theme.spacing.m,
    paddingBottom: 40,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: theme.borderRadius.m,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoBoxText: {
    color: 'white',
    fontSize: 13,
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    paddingBottom: 8,
  },
  listTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todayText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: theme.borderRadius.m,
    marginBottom: 12,
    borderLeftWidth: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  cardBody: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoCol: {
    marginRight: 30,
  },
  infoLabel: {
    fontSize: 11,
    color: '#888',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#444',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
    alignItems: 'flex-start',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.6)',
    marginTop: 15,
    fontSize: 14,
  }
});

export default DailyGoalsScreen;
