# CorBot

Telegram bot to throw random quotes from V.C.

Add `.env` file with you token:

```
BOT_TOKEN="<your-token-goes-here>"
```

## Run in dev

```sh
yarn dev
```

## Run in prod

```sh
yarn start
```

## Forever

To keep the bot running use `forever`.

### Install

```sh
yarn global add forever
```

### Start

```sh
yarn forever
```

### Stop

```sh
forever stopall
```
