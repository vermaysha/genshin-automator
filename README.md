# Genshin Impact Automatic Web Helper

![Genshin Impact](https://www.gensh.in/wallpaper/genshin/genshin_16.png)

**Genshin Impact Automatic Web Helper** adalah aplikasi yang sebagai pembantu yang akan bekerja secara otomatis untuk melakukan checkin ke event web login dari hoyolab dan akan melakukan redeem codes apabila ditemukan kode redeem baru.

Semenjak Heroku sudah tidak menyediakan free tier dan saya dapat informasi kalau ada pengganti Heroku yaitu Replit yang menyediakan free tier yang cukup bagus sehingga saya membuat code baru yang kompatibel dengan replit. Untuk instruksi installasi tertera dibawah.

## Table of contents

- [Usage](#usage)
  - [System Requirements](#system-requirements)
  - [Environment Settings](#environment-settings)
  - [Project Setup](#project-setup)
  - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
  - [Compiles for production](#compiles-for-production)
- [Setup Replit Project](#setup-replit-project)
- [How to get code updates in Replit ?](#how-to-get-code-updates-in-replit)
- [How to get cookies](#how-to-get-cookies)
- [How to setup multiple accounts](#how-to-setup-multiple-accounts)
- [How to get User Agent ?](#how-to-get-user-agent)
- [How to get Discord Callback ?](#how-to-get-discord-callback)
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

| ENV Variable     | Description                                                                                                                                             |                                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OS_COOKIES       | Cookies milik hoyolab yang nantinya digunakan sebagai authorization. <br> [How to get cookies ?](#how-to-get-cookies)                                   | **Required**                                                                                                                                                        |
| USER_AGENT       | Sebagai User Agent ketika akan melakukan request. <br> [How to get User Agent ?](#how-to-get-user-agent)                                                | **Optional** <br> Default: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Edg/104.0.1293.70` |
| DISCORD_CALLBACK | Notifikasi ketika checkin ataupun redeem code telah berhasil maupun gagal dilakukan. <br> [How to get Discord Callback ?](#how-to-get-discord-callback) | **Optional**                                                                                                                                                        |

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

## Setup Replit Project

Sebelum menggunakan layanan dari Replit silahkan pastikan dulu sudah memiliki akun replit, apabila belum bisa mendaftar [disini](https://replit.com/signup). Pastikan juga sudah memilik akun [Github](https://github.com/join) karena nantinya akan menggunakan Git sebagai Version Control untuk memudahkan apabila terdapat update code.

1. Login ke akun Github mu dan [fork repository ini](https://github.com/vermaysha/Genshin-Impact-Automatic-Web-Helper/fork) kemudan klik tombol `Create Fork` <br> ![Fork repository](https://i.imgur.com/NkFg01v.png)
2. Setelah berhasil melakukan fork ke akun Github mu, maka login ke akun Replit mu dan Klik button `Create` seperti gambar dibawah <br> ![Create Project](https://i.imgur.com/6KxpvyS.png)
3. Maka akan muncul modal baru seperti gambar dibawah, silahkan pilih `Import from Github` <br> ![Import from github](https://i.imgur.com/smcrJpF.png)
4. Akan muncul modal baru lagi selanjutnya silahkan klik `Connect Github to Import your private repos` dan akan diarahkan ke halaman GitHub, silahkan klik button `Authorize` <br> ![connect github](https://i.imgur.com/U6T8L2Y.png)
5. Selanjutnya pada bagian Github Url tinggal cari repository yang tadi di fork, umumnya akan bernama `Genshin-Impact-Automatic-Web-Login`, setelah itu klik button `Import from github` <br> ![Import from github](https://i.imgur.com/3hnZm16.png)
6. Tunggu beberapa saat sebelum dijalankan dan pastikan sudah mengatur [Environment Settings](#environment-settings) <br> ![Importing](https://i.imgur.com/whq9qu5.png)
7. Untuk mengatur Environment Variable bisa pada sidebar bagian kiri dengan icon gembok seperti gambar dibawah <br> ![ENV SETTING](https://i.imgur.com/jVxVYgN.png)
8. Setelah project siap, bisa langsung dijalankan dengan mengeklik button `Run`
9. Disarankan untuk menggunakan layanan dari [Freshping](https://www.freshworks.com/website-monitoring/) untuk mencegah layanan Replit mati.

## How to get code updates in Replit ?

Untuk mendapatkan code updates pada layanan Replit silahkan mengikuti cara ini:

1. Pada repository hasil fork, apabila ada pesan `This branch is 1 commit behind vermaysha:master` maka ada update codes dan silahkan klik `Fetch upstream` -> `Update Branch` <br> ![Branch Updated](https://i.imgur.com/LEUCohR.png)
2. Pada project Replitmu silahkan pilih menu seperti digambar dan klik button `Pull` <br> ![Pull](https://i.imgur.com/ZpeLPhn.png)
3. Kode telah diupdate.

## How to get cookies

Untuk mendapatkan cookies dapat mengikuti langkah-langkah berikut secara urut, yaitu:

- Mengakses halaman [Hoyolab](https://hoyolab.com)
- Kemudian buka menu **Developer tools**, umumnya menggunakan kombinasi shortcut `Ctrl+Shift+I` atau `F12`, apabila tidak tampil juga silahkan ikuti intruksi gambar dibawah <br>
  ![How to open Developer tools instruction](https://i.imgur.com/TTsl6aA.png)
- Setelah menu **Developer tools** terbuka, pilih tab **Console** kemudian ketik perintah `document.cookie` seperti gambar dibawah <br>
  ![How to get cookie with developer tools](https://i.imgur.com/z0V8HbJ.png)
- Copy semua yang berada diantar tanda `' (quote)`
- Lalu paste pada variable ENV `OS_COOKIES`
- _Notes_: Apabila akan menambahkan lebih dari satu cookies silahkan merujuk pada [How to setup multiple accounts](#how-to-setup-multiple-accounts)

## How to setup multiple accounts

Aplikasi ini mendukung lebih dari 1 akun dengan menggunakan tanda pemisah `#` antar 2 cookies, contoh: <br>
![Multi account](https://i.imgur.com/dvyZbEW.png)

**Sangat Disarankan** untuk tidak menggunakan terlalu banyak akun pada 1 aplikasi apabila servermu tidak mendukung.

## How to get User Agent

Cara ini bertujuan untuk mencari User Agent sesuai dengan Browser dan Operasi Sistem yang dipakai.

- Akses [Google](https://google.com) dan ketikkan `What my user agent` pada form pencarian dan enter
- Maka akan muncul User Agent mu, silahkan dicopy semua. <br> ![How to get user agent](https://i.imgur.com/RnmXKgo.png)

## How to get Discord Callback

Sebelum melakukan cara ini, pastikan kamu sudah memiliki akun [Discord](https://discord.com) dan memiliki Server Discord sendiri.

- Pada Server Discordmu silahkan membuat channel baru.
- Klik pengaturan pada channelmu dengan cara mengeklik icon kunci seperti gambar dibawah <br> ![Edit channel](https://i.imgur.com/eY4HkBP.png)
- Maka akan muncul beberapa menu, silahkan memilik menu `Integrations` -> `Webhooks` seperti gambar dibawah <br> ![Integration](https://i.imgur.com/3c7yuCi.png)
- Selanjutnya klik button `New Webhook` lalu isi sesuai kebutuhan dan terakhir klik button `Copy Webhook URL` <br> ![Copy Webhook URL](https://i.imgur.com/3c7yuCi.png)

## Credits

- [Ashary Vermaysha](https://vermaysha.com/)

## Terms and License

- Released under the [GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html).
- Copyright 2022 [Ashary Vermaysha](https://vermaysha.com/).
- Use it for personal and commercial projects, but please don’t republish, redistribute, or resell the template.
- Attribution is not required, although it is really appreciated.
