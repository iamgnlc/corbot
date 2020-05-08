require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

const functions = require("./functions");
const logo = require("./config/logo");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

console.log(logo);

bot.onText(/o co(.+)?/i, (msg, match) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name.toLocaleLowerCase();
  const nickName = functions.getNickName(firstName);
  const quote = functions.getRandomQuote();

  const response = functions.setResponse({ nickName, quote });

  if (process.env.NODE_ENV === "development") console.log(msg);

  bot.sendMessage(chatId, response, {
    parse_mode: "Markdown",
  });
});
