import { IGuild } from "../../typings";
import {
  APIGuild,
  APIGuildTextChannel,
  APIVoiceChannel,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord-api-types/v10";
import { fetch } from "undici";
import { GuildChannel } from "../../typings";
import Client from "../Structures/Client";
import GuildTextChannel from "./GuildTextChannel";
import GuildVoiceChannel from "./GuildVoiceChat";
interface Guild extends Omit<APIGuild, "channels"> {
  client: Client;
  channels: {
    cache: Map<string, GuildChannel>;
  };
}
/**
 * @description Guild class with helper methods and custom channels, Used to create a instance of a class which inherits the raw guild data but also has custom methods and properties.
 * @param data
 * @param Client
 * @returns Guild
 * @example
 * ```
 * const guild = await new Guild(data, client).init();
 * ```
 *
 */
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
      let chan2: GuildChannel = chan;
      if (chan.type === 0) {
        const chandata = chan as APIGuildTextChannel<0>;
        chan2 = new GuildTextChannel(chandata, this.client);
      }
      if (chan.type === 2) {
        const chandata = chan as APIVoiceChannel;
        chan2 = new GuildVoiceChannel(chandata, this.client);
      }

      return chan2;
    });
    const chans: Map<string, GuildChannel> = new Map();
    channels.map((chan) => chans.set(chan.id, chan));
    /**
     * @description The channels cache of the guild. Contains custom classes which inherit the raw channel data but also have custom methods and properties.
     * @type Map<string, GuildChannel>
     * @example
     * ```
     * const guild = await new Guild(data, client).init();
     * guild.channels.cache.get("1245")
     * ```
     */
    this.channels.cache = chans;
    return this;
  }
  /**
   * Register a array of slash command to a specific guild.
   * @param commands The commands to register
   * @example
   * ```
   * client.guilds.get("1234567890").register([{name: "test", type:1, description: ""}]);
   */
  async register(commands: RESTPostAPIApplicationCommandsJSONBody[]) {
    Promise.all(
      commands.map(async (command) => {
        const res = await fetch(
          `https://discord.com/api/v10/applications/${this.client.user.id}/guilds/${this.id}/commands`,
          {
            body: JSON.stringify(command),
            headers: {
              "User-Agent": "undici/tej.js",
              Authorization: `Bot ${this.client.token}`,
              "Content-Type": "application/json",
            },
            method: "POST",
          }
        );
        if (res.status !== 200) {
          throw new Error(`${res.status}: ${res.statusText}`);
        }
      })
    ).catch((err) => {
      throw new Error(err);
    });
  }
}

export default Guild;
