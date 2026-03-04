# Gebelik Takip ve Sağlık Uygulaması (Health Tracker)

Bu proje, hamilelik sürecindeki annelerin **Kan Şekeri**, **Beslenme** ve **Fiziksel Aktivite** verilerini düzenli bir şekilde takip etmelerini sağlayan bir mobil uygulamadır. Kullanıcı dostu arayüzü ve kalıcı veri saklama özelliği ile günlük sağlık verilerinin yönetimini kolaylaştırır.

## 🚀 Temel Özellikler
- **Kalıcı Veri (Zustand + AsyncStorage)**: Girdiğiniz tüm veriler telefonunuza kaydedilir, uygulama kapansa da kaybolmaz.
- **Kan Şekeri İzlemi**: Açlık/Tokluk değerleri, insülin dozu ve otomatik tarih/saat damgası. Düşük/Yüksek şeker durumunda otomatik uyarı sistemi.
- **Detaylı Beslenme Takibi**: Öğün bazlı (Sabah, Öğle, Akşam, Ara Öğünler) yiyecek ekleme ve otomatik kalori hesaplama.
- **Fiziksel Aktivite Günlüğü**: Aktivite türü (Yürüyüş, Yoga, Özel Giriş vb.) ve süre takibi.
- **Modern UI**: React Native ve Expo ile geliştirilmiş, göz yormayan ve hızlı arayüz.

## 🛠 Kullanılan Teknolojiler
- **Framework**: React Native (Expo SDK 54)
- **State Management**: Zustand
- **Veri Saklama**: AsyncStorage
- **Navigasyon**: React Navigation (@react-navigation/native-stack)
- **Form Yönetimi**: Formik & Yup
- **İkonlar**: Expo Ionicons

## 📦 Kurulum ve Yerelde Çalıştırma
Uygulamayı kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Bağımlılıkları Kurun**:
   Terminali açın ve proje klasöründe şu komutu çalıştırın:
   ```bash
   npm install
   ```

2. **Uygulamayı Başlatın**:
   ```bash
   npx expo start
   ```

3. **Telefonda Görüntüleme**:
   - Telefonunuza **Expo Go** uygulamasını (App Store / Play Store) indirin.
   - Terminalde çıkan **QR kodu** telefonunuzun kamerası (veya Expo Go uygulaması) ile taratın.
   - Uygulama saniyeler içinde telefonunuzda açılacaktır.

## 📹 Uygulama Tanıtım Videosu
Uygulamanın çalışma anına ait kısa videoyu aşağıdan izleyebilirsiniz:
> [Tanıtım Videosu (YouTube Unlisted)] - https://www.youtube.com/shorts/oQE2upYdSc4

## 📱 APK/IPA Dosyaları
Uygulamanın kurulum dosyalarına (Android APK) aşağıdaki bölümden ulaşabilirsiniz:
> [APK İndirme Bağlantısı] - 

---
**Geliştiren:** Yurthan Kıyak
