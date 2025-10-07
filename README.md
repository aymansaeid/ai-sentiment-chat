
# AI SENTIMENT CHAT - FullStack + AI Demo Projesi

Bu proje, kullanıcıların metin tabanlı olarak sohbet edebildiği ve gönderilen her mesajın yapay zeka tarafından anlık olarak duygu analizine (pozitif, negatif, nötr) tabi tutulduğu bir web ve mobil uygulamasıdır. Proje, Full-Stack ve AI teknolojilerini bir araya getirerek uçtan uca bir uygulama geliştirme deneyimi sunmayı amaçlamaktadır.

## Çalışan Demo Linkleri

  * **Web Uygulaması (Vercel):** https://ai-sentiment-chat.vercel.app/
  * **Backend API (Render):** https://chat-backend-y35c.onrender.com
  * **Python AI Servisi (Render):** https://chat-ai-service-px9s.onrender.com
  * **Mobil Uygulama (APK):** https://expo.dev/accounts/ayman.saeid/projects/my-app/builds/82a35d65-99cf-485e-9be6-b6f0541103cd

## Kullanılan Teknolojiler

### **Frontend (Web)**

  * **React:** Kullanıcı arayüzü için geliştirme kütüphanesi.
  * **Axios:** API istekleri için kullanılan HTTP istemcisi.
  * **Deployment:** Vercel

### **Frontend (Mobil)**

  * **React Native CLI:** iOS ve Android için mobil uygulama geliştirme.
  * **Expo:** APK çıktısı almak ve geliştirme sürecini kolaylaştırmak için kullanıldı.

### **Backend**

  * **.NET Core API:** Mesajların yönetimi, veritabanı işlemleri ve AI servisi ile iletişim için RESTful API.
  * **SQLite:** Veritabanı olarak kullanıldı.
  * **Deployment:** Render (Free Web Service)

### **Yapay Zeka (AI)**

  * **Python:** Duygu analizi modelini sunan servis için kullanıldı.
  * **Gradio:** Model için hızlıca bir API arayüzü oluşturmayı sağladı.
  * **Deployment:** Render (Free Web Service)

## Proje Mimarisi ve Veri Akışı

Uygulama, frontend, backend ve AI servisi olmak üzere üç ana katmandan oluşur. Veri akışı aşağıdaki gibidir:

1.  **Kullanıcı Arayüzü (React / React Native):** Kullanıcı bir mesaj gönderir.
2.  **Backend API (.NET Core):** Frontend'den gelen mesajı ve kullanıcı rumuzunu alır.
3.  **AI Servisi (Python):** Backend, aldığı mesajı duygu analizi yapılması için Python AI servisine gönderir.
4.  **Backend API (.NET Core):** AI servisinden gelen (pozitif/nötr/negatif) duygu analiz sonucunu alır. Mesajı, kullanıcı rumuzunu ve duygu skorunu SQLite veritabanına kaydeder.
5.  **Kullanıcı Arayüzü (React / React Native):** Backend'den güncellenmiş mesaj listesini ve anlık duygu skorunu alarak ekranda gösterir.


## Klasör Yapısı

Proje, gereksinimlere uygun olarak üç ana servisi içerecek şekilde aşağıdaki klasör yapısına sahiptir:

```
/
├── ai-service/   # Python ile geliştirilen Duygu Analizi servisi
├── backend/      # .NET Core Backend API servisi
└── frontend/     # React ile geliştirilen web arayüzü
```

## Kurulum Adımları

Projeyi lokal makinenizde çalıştırmak için aşağıdaki adımları izleyin:

### 1\. Backend API (.NET Core)

```bash
# Backend klasörüne gidin
cd backend/

# Gerekli paketleri yükleyin
dotnet restore

# Projeyi çalıştırın
dotnet run
```

### 2\. AI Servisi (Python)

```bash
# AI servisi klasörüne gidin
cd ai-service/

# Gerekli Python kütüphanelerini yükleyin
pip install -r requirements.txt

# Servisi çalıştırın
python app.py
```

### 3\. Frontend (React Web)

```bash
# Frontend klasörüne gidin
cd frontend/

# Gerekli paketleri yükleyin
npm install

# Projeyi başlatın
npm start
```


## Kod Hakimiyeti ve AI Kullanımı

Bu proje, yapay zeka araçlarının geliştirme sürecine nasıl entegre edilebileceğini deneyimlemek amacıyla oluşturulmuştur.

  * **Manuel Olarak Yazılan Bölümler:** Backend API'sindeki temel iş mantığı, veritabanı sorguları (SQLite), .NET ve Python servisleri arasındaki iletişim ve React tarafındaki API isteklerini yöneten Axios entegrasyonu gibi kritik bölümler manuel olarak yazılmıştır. Bu, projenin temel mimarisine ve veri akışına tam hakimiyet sağladı.

  * **AI Desteği Alınan Bölümler:**

      * **CSS Kodları:** Web arayüzünün tasarımında ve stil dosyalarının oluşturulmasında estetik ve hız kazanmak amacıyla AI araçlarından destek alınmıştır.
      * **React Native Geliştirmesi:** Daha önce React Native tecrübem olmadığı için, component yapısı ve mobil geliştirmeye özgü bazı konularda (örneğin, native elementlerin kullanımı) AI'dan yardım alınmıştır.



### Geliştirme Süreci, Karşılaşılan Zorluklar ve Alınan Teknik Kararlar

Bu bölüm, projenin geliştirme aşamasında karşılaşılan önemli bir teknik zorluğu ve bu zorluğun üstesinden gelmek için izlenen analitik süreci detaylandırmaktadır.

  * **Hugging Face API Entegrasyon Sorunu**

Projenin ilk gününde, planlandığı gibi duygu analizi modeli için Hugging Face Spaces platformu üzerinde bir API servisi hazırlandı. Modelin deploy edilmesi sorunsuz bir şekilde tamamlansa da, projenin bir sonraki adımı olan .NET backend servisinden bu API'ye yapılan test istekleri sürekli olarak beklenmedik hatalarla sonuçlandı.

Yoğun denemelere rağmen bu entegrasyon sorunu aşılamadı. Sorunun kaynağının platformdaki anlık bir problem mi, yoksa platformu ilk kez kullanmamdan kaynaklı bir tecrübesizlik mi olduğu netleştirilemedi. Projenin zamanında tamamlanması kritik olduğu için, bu belirsizliği çözmekle daha fazla vakit kaybetmek yerine, projeyi hedefe ulaştıracak alternatif bir yol haritası çizilmesine karar verildi.

#### **Alternatif Çözümlerin Değerlendirilmesi ve Stratejik Karar**

Bu noktada iki temel alternatif çözüm yolu masaya yatırıldı:

1.  **Seçenek 1: ML.NET ile Modelin Backend'e Entegre Edilmesi**
    * **Avantajı:** Bu yaklaşım, .NET ekosistemi içinde kalarak yapay zeka modelini doğrudan backend API'sinin içine gömmeyi sağlayacaktı. Bu sayede deploy edilecek servis sayısı iki yerine bire düşecek, bu da hem geliştirme hem de deployment süreçlerini ciddi anlamda basitleştirecekti.
    * **Dezavantajı ve Elenme Sebebi:** Proje şartnamesinde, mimarinin temel gereksinimlerinden biri olarak "**Mesaj gönderildiğinde backend Python servisine istek atar**" ifadesi yer alıyordu. ML.NET kullanmak, bu kritik gereksinimi karşılamayacak ve projenin "Full-stack zincirini uçtan uca görme (React -> .NET -> Python+AI)" hedefini ihlal edecekti. Bu nedenle, daha kolay bir yol olmasına rağmen bu seçenek elendi.

2.  **Seçenek 2: Özelleştirilmiş Python Servisi Geliştirip Deploy Etmek (Seçilen Yol)**
    * **Avantajı:** Bu yaklaşım, Hugging Face kullanımından vazgeçse de projenin temel mimari yapısını birebir koruyordu. Ayrı bir Python AI servisi oluşturulacak ve backend bu servisle konuşacaktı. Bu yol, proje şartnamesindeki tüm teknoloji ve mimari gereksinimlerine sadık kalmayı sağlıyordu.
    * **Uygulama:** Bu stratejik karar doğrultusunda, Gradio kullanılarak hızlı bir şekilde bir Python API servisi oluşturuldu. Bu yeni servis, .NET backend servisi ile birlikte Render platformuna başarıyla deploy edildi ve aralarındaki iletişim sorunsuz bir şekilde sağlandı.

  * **Render Deployment:** Proje dosyalarının ve yapısının Render'ın "Blueprints" özelliğine uygun hale getirilmesi başlangıçta biraz zaman aldı, ancak başarılı deploy sonrası süreç stabil hale geldi.

  Bu zorluk, projenin sadece kod yazmaktan ibaret olmadığını; aynı zamanda karşılaşılan problemlere karşı soğukkanlı kalmayı, alternatif yolları mantıksal süzgeçten geçirmeyi ve en önemlisi, proje hedeflerine ve gereksinimlerine sadık kalarak teknik kararlar alma yeteneği gerektirdiğini gösteren önemli bir öğrenim deneyimi oldu.
