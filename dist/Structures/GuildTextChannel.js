"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const undici_1 = require("undici");
const BaseChannel_1 = __importDefault(require("./BaseChannel"));
class GuildTextChannel extends BaseChannel_1.default {
    constructor(data, client) {
        super(data.id, data.type, client);
        this.type = 0;
        const keys = Object.keys(data);
        keys.forEach((key) => {
            //@ts-ignore
            this[key] = data[key];
        });
    }
    /**
     *
     * @param message The message to send
     * @example
     * ```
     * client.guilds.get("1234567890").channels.get("12345678901234567").send("Hello World!");
     * ```
     * @returns Promise<void>
     *
     */
    async send(message) {
        const res = await (0, undici_1.fetch)(`https://discord.com/api/v10/channels/${this.id}/messages`, {
            body: JSON.stringify({
                content: message,
            }),
            headers: {
                "User-Agent": "undici/tej.js",
                Authorization: `Bot ${this.client.token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        if (res.status === 200) {
            const resp = (await res.json());
            if (resp.code) {
                throw new Error(resp.message);
            }
            return Promise.resolve();
        }
    }
    async sendRaw(data) {
        const res = await (0, undici_1.fetch)(`https://discord.com/api/v10/channels/${this.id}/messages`, {
            body: JSON.stringify(data),
            headers: {
                "User-Agent": "undici/tej.js",
                Authorization: `Bot ${this.client.token}`,
            },
            method: "POST",
        });
        if (res.status === 200) {
            const resp = (await res.json());
            if (resp.code) {
                throw new Error(resp.message);
            }
            return Promise.resolve();
        }
    }
}
exports.default = GuildTextChannel;
