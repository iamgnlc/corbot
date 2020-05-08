const dictionary = require("./config/dictionary");
const names = require("./config/names");

function getRandomQuote() {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
}

function getNickName(firstName) {
  const name = names.find((name) => {
    return name.firstName === firstName;
  });

  if (name && Math.random() >= 0.6) return name.nickName;
  else return "";

  // Example
  // Math.random() >= 0.4 // %60 probability of get "true"
  // Math.random() >= 0.5 // %50 probability of get "true"
  // Math.random() >= 0.6 // %40 probability of get "true"
}

function setResponse({ nickName, quote }) {
  let response = "";
  response += nickName && `we ${nickName}\n\n`;
  response += quote;
  return response;
}

module.exports = {
  getRandomQuote,
  getNickName,
  setResponse,
};
