var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BMUN1gWVY4QRJr4Jdk6D0SwJ4Vx419stOmP1OT9Xx7HjwSky168KpvNSD7zTp9lJNWpm01syshFsaEJg7ywsCeM",
    "privateKey": "OdhJQ-wuUGnSljtxjgRPs6Rz1bCUT4HfgTDsIyUTRxo"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dzBghrTh4Jo:APA91bGLVvU4VI7ulcGkCXFW0cc-rr0i5ROcn6NEfBNgkdVSsFR6D-bos9Eyi-a2nvxI2MYrgieHvjPJcrMJnGld54UKvKgBuDWoj83CVLqMNVwHg5xX9FjnWgI_dkRFKzJTnkGaTQla",
    "keys": {
        "p256dh": "BMbVAK1SFU/h7xJjuBQZyX46OaJ6m1slKpaZ2/xhgq2hospQKUjIQO85e2GkxEqTNAWrURQoMipxApW3tPW1b6M=",
        "auth": "YX0rfP2fQpEGaBlCHOZD0A=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '344052185642',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);