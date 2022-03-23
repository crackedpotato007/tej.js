"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseChannel {
    id = "";
    type;
    client;
    constructor(id, type, Client) {
        this.id = id;
        this.type = type;
        this.client = Client;
    }
    isGuildTextChannel() {
        return this.type === 0;
    }
    isGuildVoiceChannel() {
        return this.type === 2;
    }
}
exports.default = BaseChannel;
