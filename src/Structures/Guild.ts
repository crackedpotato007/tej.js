import { IGuild } from "../../typings";
import { APIGuild } from "discord-api-types";
import { fetch } from "undici";
import { GuildChannel } from "../../typings";
import Client from "../Structures/Client";
import TextChannel from "../Structures/TextChannel";
import BaseChannel from "../Structures/BaseChannel";
interface Guild extends Omit<APIGuild, "channels"> {
  client: Client;
  channels: {
    cache: Map<string, GuildChannel>;
  };
}
class Guild {
  constructor(data: IGuild, Client: Client) {
    Object.assign(this, data);
    this.client = Client;
    this.channels = { cache: new Map() };
  }
  async init() {
    const res = await fetch(
      `https://discord.com/api/v10/guilds/${this.id}/channels`,
      {
        headers: {
          Authorization: `Bot ${this.client.token}`,
          "User-Agent": "undici/tej.js",
          encoding: "json",
        },
      }
    );
    const data = await res.json();

    let channels = data as GuildChannel[];
    channels = channels.map((chan) => {
      chan.client = this.client;
      let chan2 = new BaseChannel(chan.id, chan.type, this.client);
      if ([0, 1, 3, 5, 10, 11, 12].includes(chan.type))
        chan2 = new TextChannel(chan);
      return chan2;
    });
    const chans: Map<string, GuildChannel> = new Map();
    channels.map((chan) => chans.set(chan.id, chan));
    this.channels.cache = chans;
    return this;
  }
}

export default Guild;
