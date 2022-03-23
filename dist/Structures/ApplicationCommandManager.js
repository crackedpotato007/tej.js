"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const undici_1 = require("undici");
/**
 * This class is used to manage and register new application commands(slash commands)
 * @param client: Client
 * **/
class ApplicationCommandManager {
    constructor(client) {
        this.client = client;
    }
    /**
    *Register slash commands globally
    *@param commands: APIApplicationCommand[]
    @returns Promise<void>
    * **/
    async register(commands) {
        Promise.all(commands.map(async (command) => {
            const res = await (0, undici_1.fetch)(`https://discord.com/api/v10/applications/${this.client.user.id}/commands`, {
                body: JSON.stringify(command),
                headers: {
                    "User-Agent": "undici/tej.js",
                    Authorization: `Bot ${this.client.token}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
            });
            const resp = (await res.json());
            if (res.status !== 200) {
                throw new Error(resp.status + " " + resp.message);
            }
        }));
    }
}
exports.default = ApplicationCommandManager;
