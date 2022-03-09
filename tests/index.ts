import Client from "../src/Structures/Client";
const client = new Client();
client.start("ODQ3NDM3MzkwNjU0MjEwMTE4.YK-Dkg.7oiOJs3ZaGP-XtYJiTrJa434ZyI");
client.on("READY", () => {
  const chan = client.guilds
    .get("779679929242746920")
    ?.channels.cache.get("780106253493207051");
  if (chan?.isGuildTextChannel()) {
    chan.send("Hello World");
  }
});
