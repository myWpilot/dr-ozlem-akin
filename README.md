# Dr. Özlem Akın — Kişisel Web Sitesi

Bu proje, Dr. Özlem Akın'ın kişisel web sitesidir.

## Dosya Yapısı

```
/
├── index.html          # Ana sayfa
├── images/
│   └── ozlem-akin.jpg  # Profil fotoğrafı
└── README.md
```

## Vercel ile Deploy

1. GitHub'a push edin
2. vercel.com → "New Project" → GitHub reponuzu seçin
3. Deploy edin
4. drozlemakin.com.tr alan adını Vercel DNS'e bağlayın

## Alan Adı Bağlama (drozlemakin.com.tr)

Vercel Dashboard → Settings → Domains → `drozlemakin.com.tr` ekleyin
Alan adı kayıt firmanızda (örn. İsimtescil) DNS kayıtlarını güncelleyin:
- A kaydı: `76.76.21.21` (Vercel IP)
- CNAME: `www` → `cname.vercel-dns.com`
