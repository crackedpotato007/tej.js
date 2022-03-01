"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const ws_1 = require("ws");
const undici_1 = require("undici");
const cache_1 = require("../REST/cache");
/**
 * The Client class is the main class for the library.
 * It handles the connection to the Discord gateway and
 * provides a simple interface for interacting with the
 * rest of the library.
 * @extends EventEmitter
 * @example
 * ```
 * const client = new Client({
 * intents: [
 * "GUILDS",
 * "GUILD_MEMBERS",
 * "GUILD_BANS",
 * ]
 * });
 * client.on("ready", () => {
 * console.log("Ready!");
 * });
 * client.login(token)
 * ```
 */
class Client extends events_1.EventEmitter {
    token = "";
    guilds = new Map();
    constructor() {
        super();
    }
    async start(token) {
        this.token = token;
        let existingGuilds = [];
        const res = await (0, undici_1.fetch)("https://discord.com/api/v10/gateway/bot", {
            headers: {
                Authorization: `Bot ${token}`,
                "user-agent": "undici/discord.js",
            },
        });
        if (res.status !== 200) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const data = (await res.json());
        const ws = new ws_1.WebSocket(data.url + "/?v=9&encoding=json");
        let interval = 0;
        let s = null;
        ws.on("open", () => {
            ws.send(JSON.stringify({
                op: 2,
                d: {
                    token,
                    properties: {
                        $os: "linux",
                        $browser: "undici/tej.js",
                        $device: "undici/tej.js",
                    },
                    intents: 14023,
                },
            }));
        });
        ws.on("message", async (data) => {
            const res = JSON.parse(data.toString());
            if (res.t === "READY") {
                existingGuilds = res.d.guilds;
                await (0, cache_1.startCaching)(this, this.token);
            }
            s = res.s;
            if (res.op === 11)
                return;
            if (res.op === 10) {
                interval = res.d.heartbeat_interval;
                setInterval(() => {
                    ws.send(JSON.stringify({
                        op: 1,
                        d: s,
                    }));
                }, interval);
            }
            if (res.t) {
                if (res.t === "GUILD_CREATE" &&
                    existingGuilds.find((g) => g.id === res.d.id))
                    return;
                this.emit(res.t, res.d);
            }
        });
        return this;
    }
}
exports.default = Client;
const client = new Client();
client.start("ODQ3NDM3MzkwNjU0MjEwMTE4.YK-Dkg.w0qeRfVLeMR09T0HqzndsdpoSpk");
client.on("READY", () => console.log(client.guilds));
