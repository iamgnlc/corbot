require('dotenv').config();

import TelegramBot from 'node-telegram-bot-api';

import {
  isAllowed,
  getPhoto,
  getNickName,
  getRandomQuote,
  setResponse,
} from './functions';
import logo from './config/logo';

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

console.log(logo);

let chatId;
let nickName;
let response;

const dispatchPhoto = (match) => {
  response = getPhoto(match);
  bot.sendPhoto(chatId, response);
};

const dispatchResponse = async () => {
  const quote = await getRandomQuote();

  response = setResponse({ nickName, quote });
  bot.sendMessage(chatId, response, {
    parse_mode: 'Markdown',
  });
};

const splitMatch = (match) => {
  if (match)
    return match
      .trim()
      .split(' ')
      .filter((m) => m !== null)
      .map((m) => m.toLowerCase());
  else return [false];
};

bot.onText(/o co(.+)?/i, (msg, match) => {
  if (process.env.NODE_ENV === 'development') console.log(msg);

  const firstName = msg.from.first_name.toLowerCase();
  // Return if not authorised.
  if (!isAllowed(firstName)) return false;

  chatId = msg.chat.id;
  nickName = getNickName(firstName);

  const matches = splitMatch(match[1]);

  matches.forEach((match) => {
    switch (true) {
      // Pictures.
      case /(ciro|monica|alfredo)/.test(match):
        dispatchPhoto(match);
        break;
      // Quotes.
      default:
        dispatchResponse();
        break;
    }
  });
});
