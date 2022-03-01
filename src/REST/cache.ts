import { fetch } from "undici";
import Client from "../Structures/Client";
import { APIGuild } from "discord-api-types";
import { IGuild } from "../../typings";
import Guild from "../Structures/Guild";
const cacheChannels = async (guildids: string[], Client: Client) => {
  return new Promise(async (resolve, reject) => {
    guildids.map(async (guildID) => {
      const data = await fetch(
        `https://discord.com/api/v10/guilds/${guildID}/channels`,
        {
          headers: {
            Authorization: `Bot ${Client.token}`,
            "User-Agent": "undici/tej.js",
            encoding: "json",
          },
        }
      );
      if (data.status !== 200)
        throw new Error(`${data.status} ${data.statusText}`);
      const guildarr = Array.from(Client.guilds.values());
      await Promise.all(
        guildarr.map(async (guild) => {
          Client.guilds.set(guild.id, await new Guild(guild, Client).init());
        })
      );
      resolve(Client);
    });
  });
};

const cacheGuilds = async (Client: Client, token: string) => {
  const data = await fetch("https://discord.com/api/v10/users/@me/guilds", {
    headers: {
      Authorization: `Bot ${token}`,
      "User-Agent": "undici/tej.js",
      encoding: "json",
    },
  });
  if (data.status !== 200) {
    throw new Error(`${data.status} ${data.statusText}`);
  }
  const data2 = (await data.json()) as APIGuild[];
  for (const data of data2) {
    const guild = await fetch(`https://discord.com/api/v10/guilds/${data.id}`, {
      headers: {
        Authorization: `Bot ${token}`,
        "User-Agent": "undici/tej.js",
        encoding: "json",
      },
    });
    if (guild.status !== 200) {
      throw new Error(`${guild.status} ${guild.statusText}`);
    }
    const guild2 = (await guild.json()) as IGuild;
    Client.guilds.set(guild2.id, guild2);
  }
  return Client;
};
async function startCaching(Client: Client, token: string) {
  setInterval(async () => {
    await cacheGuilds(Client, token),
      await cacheChannels(Array.from(Client.guilds.keys()), Client);
  }, 60 * 1000 * 10);
  return Promise.all([
    await cacheGuilds(Client, token),
    await cacheChannels(Array.from(Client.guilds.keys()), Client),
  ]);
}

export { startCaching };
