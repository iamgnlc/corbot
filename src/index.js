require('dotenv').config();

import TelegramBot from 'node-telegram-bot-api';

import {
  getPhoto,
  getNickName,
  getRandomQuote,
  setResponse,
} from './functions';
import logo from './config/logo';

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

console.log(logo);

bot.onText(/(ciro)|(alfredo)/i, async (msg, match) => {
  if (!match) return false;
  const chatId = msg.chat.id;
  const url = getPhoto(match[1].trim());
  bot.sendPhoto(chatId, url);
});

bot.onText(/o co(.+)?/i, async (msg, _match) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name.toLowerCase();
  const nickName = getNickName(firstName);
  const quote = await getRandomQuote();

  const response = setResponse({ nickName, quote });

  if (process.env.NODE_ENV === 'development') console.log(msg);

  bot.sendMessage(chatId, response, {
    parse_mode: 'Markdown',
  });
});
