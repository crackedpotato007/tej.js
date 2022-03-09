import Client from "../src/Structures/Client";
import "dotenv/config";
const client = new Client();
client.start(process.env.TOKEN!);
client.on("READY", () => {
  const chan = client.guilds
    .get("779679929242746920")
    ?.channels.cache.get("783585550673510430");
  if (chan?.isGuildVoiceChannel()) {
    chan.connect();
  }
});
