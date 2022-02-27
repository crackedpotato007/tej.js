import { fetch } from "undici";
import Client from "../Structures/Client";
import { APIGuild } from "discord-api-types";
import { Guild } from "../../typings";
import TextChannel from "../Structures/TextChannel";
import { BaseChannel } from "../exports";
import { GuildChannel } from "../../typings";
const cacheChannels = async (guildids: string[], Client: Client) => {
  return new Promise(async (resolve, reject) => {
    await Promise.all(
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

        let channels = (await data.json()) as GuildChannel[];
        channels = channels.map((chan) => {
          chan.client = Client;
          let chan2 = new BaseChannel(chan.id, chan.type, Client);
          if ([0, 1, 3, 5, 10, 11, 12].includes(chan.type))
            chan2 = new TextChannel(chan);
          return chan2;
        });
        const chans: Map<string, GuildChannel> = new Map();
        channels.map((chan) => chans.set(chan.id, chan));
        const guildOBJ = Client.guilds.get(guildID);
        if (!guildOBJ) return;
        guildOBJ.channels = chans;
        Client.guilds.set(guildID, guildOBJ);
      })
    );
    resolve(Client);
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
    const guild2 = (await guild.json()) as Guild;
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
