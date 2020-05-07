require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

const dictionary = require("./dictionary");
const logo = require("./logo");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

console.log(logo);

const getRandoQuote = () => {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
};

bot.onText(/(o co)/i, (msg, _match) => {
  const chatId = msg.chat.id;

  if (process.env.NODE_ENV === "development") console.log(msg);

  bot.sendMessage(chatId, getRandoQuote(), { parse_mode: "Markdown" });
});
