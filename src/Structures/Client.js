"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var events_1 = require("events");
var ws_1 = require("ws");
var undici_1 = require("undici");
var cache_1 = require("../REST/cache");
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
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client() {
        var _this = _super.call(this) || this;
        _this.token = "";
        _this.guilds = new Map();
        return _this;
    }
    Client.prototype.start = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var existingGuilds, res, data, ws, interval, s;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.token = token;
                        existingGuilds = [];
                        return [4 /*yield*/, (0, undici_1.fetch)("https://discord.com/api/v10/gateway/bot", {
                                headers: {
                                    Authorization: "Bot ".concat(token),
                                    "user-agent": "undici/discord.js"
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.status !== 200) {
                            throw new Error("".concat(res.status, " ").concat(res.statusText));
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = (_a.sent());
                        ws = new ws_1.WebSocket(data.url + "/?v=9&encoding=json");
                        interval = 0;
                        s = null;
                        ws.on("open", function () {
                            ws.send(JSON.stringify({
                                op: 2,
                                d: {
                                    token: token,
                                    properties: {
                                        $os: "linux",
                                        $browser: "undici/tej.js",
                                        $device: "undici/tej.js"
                                    },
                                    intents: 14023
                                }
                            }));
                        });
                        ws.on("message", function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        res = JSON.parse(data.toString());
                                        if (!(res.t === "READY")) return [3 /*break*/, 2];
                                        existingGuilds = res.d.guilds;
                                        return [4 /*yield*/, (0, cache_1.startCaching)(this, this.token)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        s = res.s;
                                        if (res.op === 11)
                                            return [2 /*return*/];
                                        if (res.op === 10) {
                                            interval = res.d.heartbeat_interval;
                                            setInterval(function () {
                                                ws.send(JSON.stringify({
                                                    op: 1,
                                                    d: s
                                                }));
                                            }, interval);
                                        }
                                        if (res.t) {
                                            if (res.t === "GUILD_CREATE" &&
                                                existingGuilds.find(function (g) { return g.id === res.d.id; }))
                                                return [2 /*return*/];
                                            this.emit(res.t, res.d);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, this];
                }
            });
        });
    };
    return Client;
}(events_1.EventEmitter));
exports["default"] = Client;
