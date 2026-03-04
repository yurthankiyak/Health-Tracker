import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { theme } from '../constants/theme';

const DailyGoalsScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerImageContainer}>
        {/* Placeholder for the top image: food basket */}
        <View style={styles.placeholderImg}>
          <Text style={{color: '#fff'}}>Resim (Besinler)</Text>
        </View>
        <Text style={styles.title}>Günlük Hedefler</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.boldText}>Gebelikte Hedeflenen kan şekeri değerleri</Text>
        <Text style={styles.text}>Açlık kan şekerlerinin <Text style={styles.underline}>≤95mg/dl</Text> ve</Text>
        <Text style={styles.text}>Tokluk kan şekerinin; 1. saatte <Text style={styles.underline}>≤140mg/dl</Text>,</Text>
        <Text style={styles.text}>                          2. saatte <Text style={styles.underline}>≤120mg/dl</Text> olması hedeflenir</Text>
        <Text style={styles.text}>Gün içerisinde hiçbir ölçüm <Text style={styles.underline}>60 mg/dl</Text> altında olmamalı</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.boldText}>HbA1c <Text style={styles.text}>≤%6,5 (tercihen ≤%6,0)</Text></Text>
        <Text style={styles.text}>Haftada 3 gün sabah, öğle, akşam açlık kan şekerinize; yemeklerden 1 saat sonra tokluk kan şekerinize bakınız.</Text>
        <Text style={styles.text}>Tokluk kan şekerlerine yemeğin ilk lokmasından 1 saat sonra bakılır !!!!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.boldHeading}>BESLENME</Text>
        <Text style={styles.text}>Gebelik boyunca almanız gereken ideal kilo alımı; 12,5-18 kg' dur.</Text>
        <Text style={styles.text}>Bir gün boyunca almanız gereken kalori:2200 kcal</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.boldHeading}>EGZERSİZ</Text>
        <Text style={styles.text}>Hekimin gebeye egzersiz yapma konusunda bir sakıncası olmadığı takdirde gebelerin haftada en az 3 gün en az 20- 30 dakikalık hafif - orta yoğunlukta düzenli egzersiz yapmaları önerilmektedir.</Text>
        <Text style={styles.text}>Gebeler için düzenli yapılabilen ve en uygun egzersiz tempolu yürüyüştür.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.boldHeading}>AÇIKLAMA:</Text>
        <Text style={styles.text}>Her gün mutlaka 2,5-3 litre su tüketmeye özen gösteriniz..</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.m,
  },
  headerImageContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.l,
    padding: theme.spacing.m,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.m,
  },
  placeholderImg: {
    width: 100,
    height: 100,
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  section: {
    marginBottom: theme.spacing.m,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 4,
  },
  boldHeading: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.colors.text,
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  underline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  }
});

export default DailyGoalsScreen;
