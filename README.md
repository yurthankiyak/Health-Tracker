# Pregnancy Tracker (React Native + Expo) ⚛️📱

Bu proje, hamilelik sürecinde olan kadınların kan şekeri, beslenme, fiziksel aktivite gibi metriklerini ve günlük hedeflerini takip etmelerini sağlayan bir mobil uygulamadır. Üniversite/Bootcamp projesi gereksinimleri doğrultusunda React Native ve Expo kullanılarak geliştirilmiştir.

## 📸 Ekran Görüntüleri ve Tasarım

Uygulamanın arayüzü, panoda verilen referans tasarım temel alınarak oluşturulmuştur. Kırmızı ve beyaz tonların ağırlıkta olduğu, okunabilir ve net bir arayüz tasarlanmıştır.

## 📦 Özellikler

- **Giriş (Login) Ekranı:** Kullanıcı adı ve şifre ile basit giriş deneyimi.
- **Ana Menü:** Modüllere kolay erişim sağlayan ikonlu kart yapısı (Kan Şekeri İzlem, Fiziksel Aktivite, Beslenme Değerlendirme).
- **Kan Şekeri İzlem:** Önceki ölçümlerin listelendiği, detaylı kart görünümü ve silme özelliğini barındıran liste ekranı.
- **Kan Şekeri Uyarı Modalı:** Ölçüm eklendiğinde eğer değer kritik seviyedeyse (örn: Hipoglisemi, <70), kullanıcıyı şeker tüketmeye ve ara öğün almaya yönlendiren bilgilendirici bir Alert yapısı.
- **Beslenme Formu:** Öğün ve besin miktarları ekleme ekranları. Seçilen besine göre dinamik kalori/ölçü gösterimi sağlayan dummy data (mock data) altyapısı.
- **Günlük Hedefler:** Kan şekeri, beslenme ve fiziksel aktivite konusunda gebelikte olması gereken standart hedef değerlerin yer aldığı bilgilendirme sayfası.

## 🛠 Kullanılan Teknolojiler

- **React Native** & **Expo**
- **TypeScript** (Tip güvenliği için)
- **React Navigation** (\@react-navigation/native-stack\) - Ekranlar arası geçişler için.
- **Expo Vector Icons** (Arayüzdeki görseller ve ikonlar için)
- Gelişmiş Dummy Data (Mock Veriler) ile ekran gösterimleri

## 🚀 Kurulum & Çalıştırma

1. Repoyu bilgisayarınıza klonlayın:
   \\\ash
   git clone <repo-url>
   cd PregnancyTracker
   \\\

2. Paketleri yükleyin:
   \\\ash
   npm install
   \\\

3. Projeyi başlatın:
   \\\ash
   npx expo start
   \\\

4. Açılan QR kodunu telefonunuzdaki **Expo Go** uygulaması ile okutarak ya da Android/iOS emülatöründe (A veya I tuşlarına basarak) uygulamayı çalıştırabilirsiniz.

## 📝 Proje Notu (Kararlar ve Problem Çözümü)

- **Problem:** Hamile kadınların düzenli olarak birden fazla sağlık metriğini takip etmesi zordur.
- **Hedef Kitle:** Düzenli tıbbi takibe ihtiyaç duyan ve özellikle Gestasyonel Diyabet (Gebelik Şekeri) riski taşıyan hamile kadınlar.
- **Tasarım Kararları:** Uygulamanın oldukça sade ve stres yaratmayan bir renk paletine sahip olması hedeflendi. Referans tasarımdaki renkler ve "Kart" tabanlı navigasyon modülleri doğrudan React Native ile komponentleştirilerek implemente edildi ("src/components/Card.tsx"). Uyarıların modal şeklinde ve kırmızı çizgilerle dikkat çeker biçimde olmasına özen gösterildi.
