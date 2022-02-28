# TEJ.JS

![Pull requests](https://img.shields.io/github/issues-pr-raw/arnav7633/tej.js?style=plastic)
![Issues](https://img.shields.io/github/issues-raw/arnav7633/tej.js)
![Stars](https://img.shields.io/github/stars/arnav7633/tej.js)
![Forks](https://img.shields.io/github/forks/arnav7633/tej.js)
![License](https://img.shields.io/github/license/arnav7633/tej.js)

A lightweight and efficient wrapper for the discord api, aimed to be fast. Please star the project if you like it.

# Installation

```js
npm i "https://github.com/arnav7633/tej.js"
```

# Usage

You can create a client with the following method

```js
const { Client } = require("tej.js");
const bot = new Client();
bot.on("READY", () => console.log("The client is ready!"));
bot.start(token);
```

The client emits all the events as they are from the discord API with their raw payloads, they can be found [here](https://discord.com/developers/docs/topics/gateway#gateway-intents).
To get the custom payload classes they will need to be fetched indepdently from the caches

# Links

[Documentation](http://tej.arnavmishra.me)

# Contributing

You can create a PR or send me a direct message through discord CrackedPotato#1381
