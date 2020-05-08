import fetch from 'node-fetch';

const names = require('./config/names');

export const getRandomQuote = () => {
  const url = process.env.SPREADSHEET_ENDPOINT;
  const settings = { method: 'Get' };

  return fetch(url, settings)
    .then((res) => res.json())
    .then((res) => res.feed.entry)
    .then((res) => res[Math.floor(Math.random() * res.length)])
    .then((res) => res.content['$t']);
};

export const getNickName = (firstName) => {
  const name = names.find((name) => {
    return name.firstName === firstName;
  });

  if (name && Math.random() >= 0.6) return name.nickName;
  else return '';

  // Example
  // Math.random() >= 0.4 // %60 probability of get "true"
  // Math.random() >= 0.5 // %50 probability of get "true"
  // Math.random() >= 0.6 // %40 probability of get "true"
};

export const setResponse = ({ nickName, quote }) => {
  let response = '';
  response += nickName && `we ${nickName}\n\n`;
  response += quote;
  return response;
};
