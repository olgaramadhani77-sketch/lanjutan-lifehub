repo dullu : https://github.com/justaryadi/Eco-Project

Berikut draf `README.md` yang sudah diperbarui dengan tambahan detail fitur spesifik untuk **Backend** serta kontribusi dari masing-masing anggota tim:

---

# 🌱 LIFEHUB

> **"Track Your Life, Heal Your Earth"**

**LIFEHUB** adalah platform *life management* modern berbasis web yang mengintegrasikan produktivitas harian dengan gaya hidup ramah lingkungan (*sustainable lifestyle*) melalui pendekatan *gamification*.

Dengan LIFEHUB, produktivitas utama menjadi **Main Quest**, sedangkan aksi hijau terhadap lingkungan dikemas sebagai **Eco Side Quest** yang menyenangkan!


## ⚙️ Fitur Utama & Layanan Backend

### 🎨 Frontend / User Experience

* **Daily Dashboard:** Pusat kendali utama untuk memantau perjalanan aktivitas harian dan *progress* tujuan pribadi.
* **Quest Manager (Task & Priority):** Fitur *to-do list* yang memuat agenda harian (*Main Quest*) 
* **Pomodoro Focus Timer:** Penghitung waktu fokus.
* **Habit Tracker:** Pencatat kebiasaan positif harian dengan bonus XP berdasarkan konsistensi (*streak*).
* **Eco Quest:** Mendukung keseharian dengan melakukan sesuatu langkah yang membuat bumi semakin baik/green.
   
### 💻 Backend & System Features

* **Authentication & Authorization:** Sistem keamanan menggunakan **JWT (JSON Web Token)** dan **Middleware** untuk proteksi *route* serta manajemen sesi pengguna.
* **Laravel API & Endpoints:** Menyediakan *endpoint* API terstruktur untuk integrasi data fitur (*Tasks, Habits, Focus Timer, & User Stats*).
* **Data Pagination:** Optimalisasi *data loading* pada daftar tugas dan *habits* untuk performa yang lebih baik.
* **Database Management:** Integrasi skema tabel *relational* menggunakan **Supabase** yang disesuaikan dengan fungsionalitas seluruh fitur.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Chart.js
* **Backend:** Laravel
* **Database:** Supabase
* **Authentication:** JWT (JSON Web Token), Laravel Middleware
* **Environment & Tools:** Laragon, GitHub
