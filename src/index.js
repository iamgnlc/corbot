require("dotenv").config();

import TelegramBot from "node-telegram-bot-api";

import { getNickName, getRandomQuote, setResponse } from "./functions";
import logo from "./config/logo";

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

console.log(logo);

bot.onText(/o co(.+)?/i, (msg, match) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name.toLocaleLowerCase();
  const nickName = getNickName(firstName);
  const quote = getRandomQuote();

  const response = setResponse({ nickName, quote });

  if (process.env.NODE_ENV === "development") console.log(msg);

  bot.sendMessage(chatId, response, {
    parse_mode: "Markdown",
  });
});
