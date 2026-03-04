import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Input from '../components/Input';
import Button from '../components/Button';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [username, setUsername] = useState('mobil');
  const [password, setPassword] = useState('123456');

  const handleLogin = () => {
    // Navigate to Main Menu
    navigation.replace('MainMenu');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.topSection}>
          <Ionicons name="woman" size={100} color={theme.colors.background} />
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Giriş</Text>
            <View style={styles.underline} />
          </View>

          <Input 
            label="Kullanıcı Adı"
            icon="person"
            value={username}
            onChangeText={setUsername}
          />
          <Input 
            label="Şifre"
            icon="eye-off"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.buttonContainer}>
            <Button title="GİRİŞ" variant="blue" onPress={handleLogin} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  container: {
    flex: 1,
  },
  topSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 0.6,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
  },
  titleContainer: {
    marginBottom: theme.spacing.xl,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  underline: {
    height: 3,
    backgroundColor: theme.colors.buttonBlue,
    width: '100%',
  },
  buttonContainer: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  }
});

export default LoginScreen;
