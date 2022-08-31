# Genshin Impact Automatic Web Helper

![Genshin Impact](https://www.gensh.in/wallpaper/genshin/genshin_16.png)

**Genshin Impact Automatic Web Helper** adalah aplikasi yang sebagai pembantu yang akan bekerja secara otomatis untuk melakukan checkin ke event web login dari hoyolab dan akan melakukan redeem codes apabila ditemukan kode redeem baru.

## Table of contents

- [Usage](#usage)
  - [System Requirements](#system-requirements)
  - [Environment Settings](#environment-settings)
  - [Project Setup](#project-setup)
  - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
  - [Compiles for production](#compiles-for-production)
  - [How to get cookies](#how-to-get-cookies)
  - [How to setup multiple accounts](#how-to-setup-multiple-accounts)
- [Credits](#credits)
- [Terms and License](#terms-and-license)
- [About Us](#about-us)

## Usage

Project ini dibuat menggunakan ExpressJS dengan Typescript beserta beberapa library seperti:

- node-cron
- sqlite3
- discord-ts-webhook
- ts-node-dev

### System Requirements

Beberapa persyaratan dasar yang harus dipenuhi sebelum menjalankan aplikasi ini adalah

| Requirements | Version      |
| ------------ | ------------ |
| NodeJS       | v16 or above |

### Environment Settings

Pengaturan ENV pada aplikasi ini tidak menggunakan file .env, sehingga untuk variabel ENV harus diexport pada bash yaitu ~/.bashrc dengan perintah `export $FOO=BAR`

Beberapa variabel ENV yang kami gunakan sudah dan harus di set tertera pada file .env.example yaitu

| ENV Variable     | Description                                                                         |                                                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OS_COOKIES       | Cookies milik hoyolab yang nantinya digunakan sebagai authorization.                | **Required**                                                                                                                                                        |
| USER_AGENT       | Sebagai User Agent ketika akan melakukan request                                    | **Optional** <br> Default: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Edg/104.0.1293.70` |
| DISCORD_CALLBACK | Notifikasi ketika checkin ataupun redeem code telah berhasil maupun gagal dilakukan | **Optional**                                                                                                                                                        |

### Project setup

```
npm ci
```

#### Compiles and hot-reloads for development

```
npm run dev
```

#### Compiles for production

```
npm run build
```

```
npm run start
```

**Notes**: _Kami sangat merekomendasikan untuk menggunakan Nodemon, PM2, dan sebagainya didalam lingkungan production._

### How to get cookies

Untuk mendapatkan cookies dapat mengikuti langkah-langkah berikut secara urut, yaitu:

- Mengakses halaman [Hoyolab](https://hoyolab.com)
- Kemudian buka menu **Developer tools**, umumnya menggunakan kombinasi shortcut `Ctrl+Shift+I` atau `F12`, apabila tidak tampil juga silahkan ikuti intruksi gambar dibawah <br>
  ![How to open Developer tools instruction](https://i.imgur.com/TTsl6aA.png)
- Setelah menu **Developer tools** terbuka, pilih tab **Console** kemudian ketik perintah `document.cookie` seperti gambar dibawah <br>
  ![How to get cookie with developer tools](https://i.imgur.com/z0V8HbJ.png)
- Copy semua yang berada diantar tanda `' (quote)`
- Lalu paste pada variable ENV `OS_COOKIES`
- _Notes_: Apabila akan menambahkan lebih dari satu cookies silahkan merujuk pada [How to setup multiple accounts](#how-to-setup-multiple-accounts)

### How to setup multiple accounts

Aplikasi ini mendukung lebih dari 1 akun dengan menggunakan tanda pemisah `#` antar 2 cookies, contoh: <br>
![Multi account](https://i.imgur.com/dvyZbEW.png)

**Sangat Disarankan** untuk tidak menggunakan terlalu banyak akun pada 1 aplikasi apabila servermu tidak mendukung.

## Credits

- [Ashary Vermaysha](https://vermaysha.com/)

## Terms and License

- Released under the [GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html).
- Copyright 2022 [Ashary Vermaysha](https://vermaysha.com/).
- Use it for personal and commercial projects, but please don’t republish, redistribute, or resell the template.
- Attribution is not required, although it is really appreciated.
