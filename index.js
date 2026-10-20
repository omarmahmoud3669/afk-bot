const mineflayer = require('mineflayer');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('AFK Bot is running 24/7!'));
app.listen(port, () => console.log(`Server listening on port ${port}`));

// ─── إعدادات البوت ───
const BOT_CONFIG = {
  host: 'mostafa_xrole1.aternos.me', // عنوان سيرفرك
  port: 25565,                        // البورت
  username: 'AFK_Bot_247',            // اسم البوت
  password: 'afk_bot141'         // كلمة المرور
};

let isRegistered = false;

function createBot() {
  const bot = mineflayer.createBot({
    host: BOT_CONFIG.host,
    port: BOT_CONFIG.port,
    username: BOT_CONFIG.username
  });

  bot.on('spawn', () => {
    console.log('Bot joined the server!');
  });

  bot.on('message', (jsonMsg) => {
    const message = jsonMsg.toString().toLowerCase();

    if (message.includes('/register') && !isRegistered) {
      console.log('Registering bot...');
      bot.chat(`/register ${BOT_CONFIG.password} ${BOT_CONFIG.password}`);
      isRegistered = true;
    } 
    else if (message.includes('/login')) {
      console.log('Logging in bot...');
      bot.chat(`/login ${BOT_CONFIG.password}`);
    }
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => console.log('Bot error:', err));
}

createBot();
