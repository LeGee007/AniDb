Minimal Anime Katalog sayt (Jikan API) bilan itegratsiya qilingan.

Texnologiyalar:
Backend - ASP.NET Core 10, EF Core, SQLite
Frontend - Angular, Tailwind CSS (AI yordamida)

Ishga tushirish:

Backend
cd AniDb
dotnet ef database update
dotnet run
http://localhost:5216

Frontend 
cd anidb-frontend
npm install 
npm start
http://localhost:4200

 Method        PATH          Tavsif 

 GET | `/api/animes` | Barcha animeler 
 GET | `/api/animes/{id}` | Bitta anime 
 GET | `/api/animes/top` | Top 10 
 GET | `/api/animes/latest` | Oxirgi 10 
 GET | `/api/animes/search?query=` | Qidirish 
 POST | `/api/animes/{id}/rate` | Baholash 
 POST | `/api/admin/create` | Yaratish 
 PUT | `/api/admin/update/{id}` | Yangilash 
 DELETE | `/api/admin/delete/{id}` | O'chirish 
