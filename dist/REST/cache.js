"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCaching = void 0;
const undici_1 = require("undici");
const TextChannel_1 = __importDefault(require("../Structures/TextChannel"));
const exports_1 = require("../exports");
const cacheChannels = async (guildids, Client) => {
    return new Promise(async (resolve, reject) => {
        await Promise.all(guildids.map(async (guildID) => {
            const data = await (0, undici_1.fetch)(`https://discord.com/api/v10/guilds/${guildID}/channels`, {
                headers: {
                    Authorization: `Bot ${Client.token}`,
                    "User-Agent": "undici/tej.js",
                    encoding: "json",
                },
            });
            if (data.status !== 200)
                throw new Error(`${data.status} ${data.statusText}`);
            let channels = (await data.json());
            channels = channels.map((chan) => {
                chan.client = Client;
                let chan2 = new exports_1.BaseChannel(chan.id, chan.type, Client);
                if ([0, 1, 3, 5, 10, 11, 12].includes(chan.type))
                    chan2 = new TextChannel_1.default(chan);
                return chan2;
            });
            const chans = new Map();
            channels.map((chan) => chans.set(chan.id, chan));
            const guildOBJ = Client.guilds.get(guildID);
            if (!guildOBJ)
                return;
            guildOBJ.channels = chans;
            Client.guilds.set(guildID, guildOBJ);
        }));
        resolve(Client);
    });
};
const cacheGuilds = async (Client, token) => {
    const data = await (0, undici_1.fetch)("https://discord.com/api/v10/users/@me/guilds", {
        headers: {
            Authorization: `Bot ${token}`,
            "User-Agent": "undici/tej.js",
            encoding: "json",
        },
    });
    if (data.status !== 200) {
        throw new Error(`${data.status} ${data.statusText}`);
    }
    const data2 = (await data.json());
    for (const data of data2) {
        const guild = await (0, undici_1.fetch)(`https://discord.com/api/v10/guilds/${data.id}`, {
            headers: {
                Authorization: `Bot ${token}`,
                "User-Agent": "undici/tej.js",
                encoding: "json",
            },
        });
        if (guild.status !== 200) {
            throw new Error(`${guild.status} ${guild.statusText}`);
        }
        const guild2 = (await guild.json());
        Client.guilds.set(guild2.id, guild2);
    }
    return Client;
};
async function startCaching(Client, token) {
    setInterval(async () => {
        await cacheGuilds(Client, token),
            await cacheChannels(Array.from(Client.guilds.keys()), Client);
    }, 60 * 1000 * 10);
    return Promise.all([
        await cacheGuilds(Client, token),
        await cacheChannels(Array.from(Client.guilds.keys()), Client),
    ]);
}
exports.startCaching = startCaching;
