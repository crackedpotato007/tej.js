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
exports.startCaching = void 0;
var undici_1 = require("undici");
var Guild_1 = require("../Structures/Guild");
var cacheChannels = function (guildids, Client) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    guildids.map(function (guildID) { return __awaiter(void 0, void 0, void 0, function () {
                        var data, guildarr;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, undici_1.fetch)("https://discord.com/api/v10/guilds/".concat(guildID, "/channels"), {
                                        headers: {
                                            Authorization: "Bot ".concat(Client.token),
                                            "User-Agent": "undici/tej.js",
                                            encoding: "json"
                                        }
                                    })];
                                case 1:
                                    data = _a.sent();
                                    if (data.status !== 200)
                                        throw new Error("".concat(data.status, " ").concat(data.statusText));
                                    guildarr = Array.from(Client.guilds.values());
                                    return [4 /*yield*/, Promise.all(guildarr.map(function (guild) { return __awaiter(void 0, void 0, void 0, function () {
                                            var _a, _b, _c;
                                            return __generator(this, function (_d) {
                                                switch (_d.label) {
                                                    case 0:
                                                        _b = (_a = Client.guilds).set;
                                                        _c = [guild.id];
                                                        return [4 /*yield*/, new Guild_1["default"](guild, Client).init()];
                                                    case 1:
                                                        _b.apply(_a, _c.concat([_d.sent()]));
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }))];
                                case 2:
                                    _a.sent();
                                    resolve(Client);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); })];
    });
}); };
var cacheGuilds = function (Client, token) { return __awaiter(void 0, void 0, void 0, function () {
    var data, data2, _i, data2_1, data_1, guild, guild2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, undici_1.fetch)("https://discord.com/api/v10/users/@me/guilds", {
                    headers: {
                        Authorization: "Bot ".concat(token),
                        "User-Agent": "undici/tej.js",
                        encoding: "json"
                    }
                })];
            case 1:
                data = _a.sent();
                if (data.status !== 200) {
                    throw new Error("".concat(data.status, " ").concat(data.statusText));
                }
                return [4 /*yield*/, data.json()];
            case 2:
                data2 = (_a.sent());
                _i = 0, data2_1 = data2;
                _a.label = 3;
            case 3:
                if (!(_i < data2_1.length)) return [3 /*break*/, 7];
                data_1 = data2_1[_i];
                return [4 /*yield*/, (0, undici_1.fetch)("https://discord.com/api/v10/guilds/".concat(data_1.id), {
                        headers: {
                            Authorization: "Bot ".concat(token),
                            "User-Agent": "undici/tej.js",
                            encoding: "json"
                        }
                    })];
            case 4:
                guild = _a.sent();
                if (guild.status !== 200) {
                    throw new Error("".concat(guild.status, " ").concat(guild.statusText));
                }
                return [4 /*yield*/, guild.json()];
            case 5:
                guild2 = (_a.sent());
                Client.guilds.set(guild2.id, guild2);
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7: return [2 /*return*/, Client];
        }
    });
}); };
function startCaching(Client, token) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, cacheGuilds(Client, token)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, cacheChannels(Array.from(Client.guilds.keys()), Client)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 60 * 1000 * 10);
                    _b = (_a = Promise).all;
                    return [4 /*yield*/, cacheGuilds(Client, token)];
                case 1:
                    _c = [
                        _d.sent()
                    ];
                    return [4 /*yield*/, cacheChannels(Array.from(Client.guilds.keys()), Client)];
                case 2: return [2 /*return*/, _b.apply(_a, [_c.concat([
                            _d.sent()
                        ])])];
            }
        });
    });
}
exports.startCaching = startCaching;
