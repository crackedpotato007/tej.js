"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseChannel {
    id = "";
    type = 0;
    client;
    constructor(id, type, Client) {
        this.id = id;
        this.type = type;
        this.client = Client;
    }
    isGuildTextChannel() {
        return this.type === 0;
    }
}
exports.default = BaseChannel;
