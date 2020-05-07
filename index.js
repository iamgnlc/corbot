require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const dictionary = require("./dictionary");
const logo = require("./logo");

console.log(logo);

const getRandoQuote = (match) => {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
};

bot.onText(/(o co)/i, (msg, match) => {
  const chatId = msg.chat.id;

  console.log(msg);

  bot.sendMessage(chatId, getRandoQuote(), { parse_mode: "Markdown" });
});
