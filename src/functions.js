import fetch from 'node-fetch';

const names = require('./config/names');

export const getRandomQuote = () => {
  const url = process.env.SPREADSHEET_ENDPOINT;
  const settings = { method: 'Get' };

  return fetch(url, settings)
    .then((res) => res.json())
    .then((res) => res.feed.entry)
    .then((res) => res[Math.floor(Math.random() * res.length)])
    .then((res) => res.content['$t'])
    .catch((err) => console.error(err));
};

export const getNickName = (firstName, force = null) => {
  const name = names.find((name) => {
    return name.firstName === firstName;
  });

  const show = force === null ? Math.random() >= 0.6 : force; // 0.4 = %60 probability of get "true"

  if (name && show) return name.nickName;
  else return '';
};

export const setResponse = ({ nickName, quote }) => {
  let response = '';
  response += nickName && `we ${nickName}\n\n`;
  response += quote;
  return response;
};
