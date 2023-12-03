
# mongxor

MongoDB daha basit ve daha hızlı hali.


## 🛠 Kurulum

- İlk adım olarak, projenizin dizininde MongoDB sürücüsünü yüklemeniz gerekmektedir:
``npm i & pnpm i mongxor``
- İkinci olarak projenize tanımlayın.
```js
const Mongxor = require('mongxor'); // mongxor modülünü projeye ekleyin.

// Veritabanına bağlanma
const db = new Mongxor('mongodb://localhost:27017', 'mydatabase');
db.connect().then(() => {
    console.log("Veritabanına başarıyla bağlanıldı!");
});
```
- Başarıyla projenize eklediniz. Dilediğiniz gibi modülü kullanabilirsiniz.
## ✨ Kullanım

- Veri Kaydetme
```js
db.set('anahtar1', 'değer1');
```

- Veri Ekleme
```js
db.add("kullanıcı", { para: 1 });
```

- Veri Çıkarma
```js
db.subtract("kullanıcı", { para: 1 });
```

- Veri Çekme
```js
db.get('anahtar1'); && db.fetch('anahtar1');
```

- Veri Güncelleme
```js
db.update('anahtar1', 'yenideğer1');
```

- Veri Silme
```js
db.remove('anahtar1');
```

- Tüm Verileri Silme
```js
db.delete();
```

- Bağlantı Kesme
```js
db.close();
```
## ❕ Bilgi
Bu modül [Luxor Bot](https://github.com/luxorbot) için [UnoxDevs](https://github.com/unoxdevs) ekibi tarafından yapılmıştır. Bu modül Github üzerinde açık kaynaklıdır, kimse izin almadan kişisel Github hesabında paylaşamaz.
