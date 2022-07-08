import Client from "../src/Structures/Client";
import "dotenv/config";
const client = new Client();
if (!process.env.TOKEN) throw new Error("No token found");
void client.start(process.env.TOKEN);
client.on("READY", async () => {
  const guild = client.guilds.get("779679929242746920");
  await guild
    ?.register([
      {
        name: "blep1",
        type: 1,
        description: "Send a random adorable animal photo",
        options: [
          {
            name: "animal",
            description: "The type of animal",
            type: 3,
            required: true,
            choices: [
              {
                name: "Dog",
                value: "animal_dog",
              },
              {
                name: "Cat",
                value: "animal_cat",
              },
              {
                name: "Penguin",
                value: "animal_penguin",
              },
            ],
          },
          {
            name: "only_smol",
            description: "Whether to show only baby animals",
            type: 5,
            required: false,
          },
        ],
      },
    ])
    .catch((err) => console.error(err));
  const chan = client.guilds
    .get("779679929242746920")
    ?.channels.cache.get("783585550673510430");
  if (chan?.isGuildVoiceChannel()) {
    await chan.connect();
  }
});
