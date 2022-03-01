"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const undici_1 = require("undici");
const TextChannel_1 = __importDefault(require("../Structures/TextChannel"));
const BaseChannel_1 = __importDefault(require("../Structures/BaseChannel"));
class Guild {
    constructor(data, Client) {
        Object.assign(this, data);
        this.client = Client;
        this.channels = { cache: new Map() };
    }
    async init() {
        const res = await (0, undici_1.fetch)(`https://discord.com/api/v10/guilds/${this.id}/channels`, {
            headers: {
                Authorization: `Bot ${this.client.token}`,
                "User-Agent": "undici/tej.js",
                encoding: "json",
            },
        });
        const data = await res.json();
        let channels = data;
        channels = channels.map((chan) => {
            chan.client = this.client;
            let chan2 = new BaseChannel_1.default(chan.id, chan.type, this.client);
            if ([0, 1, 3, 5, 10, 11, 12].includes(chan.type))
                chan2 = new TextChannel_1.default(chan);
            return chan2;
        });
        const chans = new Map();
        channels.map((chan) => chans.set(chan.id, chan));
        this.channels.cache = chans;
        return this;
    }
}
exports.default = Guild;
