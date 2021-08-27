import fetch from 'node-fetch';

import names from './config/names';
import * as photos from './config/photos';

export const getPhoto = (name) => {
  return photos[name][Math.floor(Math.random() * photos[name].length)];
};

export const getRandomQuote = () => {
  const url = process.env.SPREADSHEET_ENDPOINT;
  const settings = { method: 'Get' };

  return fetch(url, settings)
    .then((res) => res.text())
    .then((text) => JSON.parse(text.substr(47).slice(0, -2)))
    .then((res) => res.table.rows)
    .then((res) => res[Math.floor(Math.random() * res.length)])
    .then((res) => res.c[0].v)
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

export const isAllowed = (firstName) => {
  return getNickName(firstName, true).length ? true : false;
};

export const setResponse = ({ nickName, quote }) => {
  let response = '';
  response += nickName && `we ${nickName}\n\n`;
  response += quote;
  return response;
};
