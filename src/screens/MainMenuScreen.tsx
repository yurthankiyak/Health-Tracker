import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainMenu'>;

const MainMenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const menuItems = [
    { id: 1, title: 'Kan Şekeri İzlem', icon: 'water', route: 'BloodSugarList' as const },
    { id: 2, title: 'Fiziksel Aktivite ve Gebelik Hedefleri', icon: 'list', route: 'DailyGoals' as const },
    { id: 3, title: 'Beslenme Değerlendirme', icon: 'restaurant', route: 'NutritionForm' as const },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.cardWrapper}
              onPress={() => navigation.navigate(item.route)}
            >
              <Card style={styles.card}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon as any} size={48} color={theme.colors.buttonBlue} />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  container: {
    padding: theme.spacing.m,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: theme.spacing.m,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E8EFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.m,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
  }
});

export default MainMenuScreen;

