import Client from "../src/Structures/Client";
const client = new Client();
client.start("");
client.on("READY", () => console.log(client.guilds));
