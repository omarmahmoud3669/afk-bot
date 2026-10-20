const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// سيرفر الويب لإبقاء Render نشطاً
app.get('/', (req, res) => res.send('AFK Bot is running 24/7!'));
app.listen(port, () => console.log(`Server listening on port ${port}`));

// ─── إعدادات البوت ───
const BOT_CONFIG = {
  host: 'mostafa_xrole1.aternos.me', // اكتب هنا IP سيرفرك في أترنوس
  port: 25565,                        // اكتب البورت الخاص بسيرفرك
  username: 'AFK_Bot_247',            // اسم البوت داخل اللعبة
  password: 'YourPassword123'         // كلمة المرور للبوت
};

let isRegistered = false; // يتحول إلى true بمجرد التسجيل لأول مرة

function createBot() {
  const bot = mineflayer.createBot({
    host: BOT_CONFIG.host,
    port: BOT_CONFIG.port,
    username: BOT_CONFIG.username
  });

  bot.on('spawn', () => {
    console.log('Bot joined the server!');
  });

  // قراءة رسائل السيرفر الموجهة للبوت للقيام بـ Login أو Register
  bot.on('message', (jsonMsg) => {
    const message = jsonMsg.toString().toLowerCase();

    // إذا طلب السيرفر التسجيل لأول مرة
    if (message.includes('/register') && !isRegistered) {
      console.log('Registering bot...');
      bot.chat(`/register ${BOT_CONFIG.password} ${BOT_CONFIG.password}`);
      isRegistered = true; // تم التسجيل، المرات القادمة سيكتفي بـ Login فقط
    } 
    // إذا طلب السيرفر تسجيل الدخول
    else if (message.includes('/login')) {
      console.log('Logging in bot...');
      bot.chat(`/login ${BOT_CONFIG.password}`);
    }
  });

  // إعادة الاتصال تلقائياً عند الخروج أو إعادة تشغيل السيرفر
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => console.log('Bot error:', err));
}

createBot();
