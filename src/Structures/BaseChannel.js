"use strict";
exports.__esModule = true;
var BaseChannel = /** @class */ (function () {
    function BaseChannel(id, type, Client) {
        this.id = "";
        this.id = id;
        this.type = type;
        this.client = Client;
    }
    BaseChannel.prototype.isGuildTextChannel = function () {
        return this.type === 0;
    };
    return BaseChannel;
}());
exports["default"] = BaseChannel;
