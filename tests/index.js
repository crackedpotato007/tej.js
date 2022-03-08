"use strict";
exports.__esModule = true;
var Client_1 = require("../src/Structures/Client");
var client = new Client_1["default"]();
client.start("ODQ3NDM3MzkwNjU0MjEwMTE4.YK-Dkg.Lri2-Jec5y8mloqL23FId6AujXQ");
client.on("READY", function () {
    client.guilds.get("779679929242746920").channels.cache.get("780106253493207051").send("Hello World!");
});
