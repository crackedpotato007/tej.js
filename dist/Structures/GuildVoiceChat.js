"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const BaseChannel_1 = __importDefault(require("./BaseChannel"));
class GuildVoiceChannel extends BaseChannel_1.default {
    constructor(data, client) {
        super(data.id, data.type, client);
        const keys = Object.keys(data);
        keys.forEach((key) => {
            //@ts-ignore
            this[key] = data[key];
        });
    }
    /**
     *
     * @example
     * ```
     * client.guilds.get("1234567890").channels.get("12345678901234567").connect();
     * ```
     * @returns Promise<void>
     *
     */
    async connect() {
        let session_id;
        let endpoint;
        let heartbeat_interval;
        let interval_registered = false;
        let ws;
        const payload = {
            op: 4,
            d: {
                guild_id: this.guild_id,
                channel_id: this.id,
                self_mute: false,
                self_deaf: false,
            },
        };
        this.client.ws.on("message", (data) => {
            const res = JSON.parse(data.toString());
            if (res.t === "VOICE_STATE_UPDATE")
                session_id = res.d.session_id;
            if (res.t === "VOICE_SERVER_UPDATE") {
                endpoint = res.d.endpoint;
                const idpayload = {
                    op: 0,
                    d: {
                        server_id: this.guild_id,
                        user_id: this.client.user.id,
                        session_id: session_id,
                        token: res.d.token,
                    },
                };
                ws = new ws_1.WebSocket("wss://" + endpoint + "?v=4");
                ws.on("message", (data) => {
                    const res = JSON.parse(data.toString());
                    if (res.op === 8)
                        heartbeat_interval = res.d.heartbeat_interval;
                    if (res.op === 2) {
                        setInterval(() => {
                            ws.send(JSON.stringify({ op: 3, d: Date.now() }));
                        }, heartbeat_interval);
                    }
                });
                ws.on("open", () => {
                    ws.send(JSON.stringify(idpayload));
                });
            }
        });
        this.client.ws.send(JSON.stringify(payload));
    }
}
exports.default = GuildVoiceChannel;
