require('dotenv').config();

import TelegramBot from 'node-telegram-bot-api';

import {
  isOneOfUs,
  getPhoto,
  getNickName,
  getRandomQuote,
  setResponse,
} from './functions';
import logo from './config/logo';

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

console.log(logo);

bot.onText(/o co(.+)?/i, (msg, match) => {
  if (process.env.NODE_ENV === 'development') console.log(msg);

  const firstName = msg.from.first_name.toLowerCase();
  // Return if not authorised.
  if (!isOneOfUs(firstName)) return false;

  const chatId = msg.chat.id;
  const nickName = getNickName(firstName);
  let response;

  const dispatchPhoto = () => {
    response = getPhoto(match[1]);
    bot.sendPhoto(chatId, response);
  };

  const dispatchResponse = async () => {
    const quote = await getRandomQuote();

    response = setResponse({ nickName, quote });
    bot.sendMessage(chatId, response, {
      parse_mode: 'Markdown',
    });
  };

  if (match[1]) match[1] = match[1].trim();

  switch (match[1]) {
    // Pictures.
    case 'ciro':
    case 'alfredo':
    case 'monica':
      dispatchPhoto();
      break;
    // Quotes.
    default:
      dispatchResponse();
      break;
  }
});
