"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var undici_1 = require("undici");
var TextChannel_1 = require("../Structures/TextChannel");
var BaseChannel_1 = require("../Structures/BaseChannel");
/**
 * @description Guild class with helper methods and custom channels, Used to create a instance of a class which inherits the raw guild data but also has custom methods and properties.
 * @param data
 * @param Client
 * @returns Guild
 * @example
 * ```
 * const guild = await new Guild(data, client).init();
 * ```
 *
 */
var Guild = /** @class */ (function () {
    function Guild(data, Client) {
        Object.assign(this, data);
        this.client = Client;
        this.channels = { cache: new Map() };
    }
    Guild.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, channels, chans;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, undici_1.fetch)("https://discord.com/api/v10/guilds/".concat(this.id, "/channels"), {
                            headers: {
                                Authorization: "Bot ".concat(this.client.token),
                                "User-Agent": "undici/tej.js",
                                encoding: "json"
                            }
                        })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        channels = data;
                        channels = channels.map(function (chan) {
                            chan.client = _this.client;
                            var chan2 = new BaseChannel_1["default"](chan.id, chan.type, _this.client);
                            if ([0, 1, 3, 5, 10, 11, 12].includes(chan.type))
                                chan2 = new TextChannel_1["default"](chan);
                            return chan2;
                        });
                        chans = new Map();
                        channels.map(function (chan) { return chans.set(chan.id, chan); });
                        /**
                         * @description The channels cache of the guild. Contains custom classes which inherit the raw channel data but also have custom methods and properties.
                         * @type Map<string, GuildChannel>
                         * @example
                         * ```
                         * const guild = await new Guild(data, client).init();
                         * guild.channels.cache.get("1245")
                         * ```
                         */
                        this.channels.cache = chans;
                        return [2 /*return*/, this];
                }
            });
        });
    };
    return Guild;
}());
exports["default"] = Guild;
