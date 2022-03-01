"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCaching = void 0;
const undici_1 = require("undici");
const Guild_1 = __importDefault(require("../Structures/Guild"));
const cacheChannels = async (guildids, Client) => {
    return new Promise(async (resolve, reject) => {
        guildids.map(async (guildID) => {
            const data = await (0, undici_1.fetch)(`https://discord.com/api/v10/guilds/${guildID}/channels`, {
                headers: {
                    Authorization: `Bot ${Client.token}`,
                    "User-Agent": "undici/tej.js",
                    encoding: "json",
                },
            });
            if (data.status !== 200)
                throw new Error(`${data.status} ${data.statusText}`);
            const guildarr = Array.from(Client.guilds.values());
            await Promise.all(guildarr.map(async (guild) => {
                Client.guilds.set(guild.id, await new Guild_1.default(guild, Client).init());
            }));
            resolve(Client);
        });
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
