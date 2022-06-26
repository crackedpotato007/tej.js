import { fetch } from "undici";
import BaseChannel from "./BaseChannel";
import type Client from "./Client";
import type {
  APIGuildTextChannel,
  RESTPostAPIChannelMessageJSONBody,
} from "discord-api-types/v10";
/**
 * The TextChanell is the class which represents a guild text channel
 * @extends BaseChannel
 * @example
 * ```
 * Client.guilds.get("12345678901234567").channels.get("12345678901234567");
 * ```
 *
 */
interface GuildTextChannel extends APIGuildTextChannel<0> {
  type: 0;
}
class GuildTextChannel extends BaseChannel {
  constructor(data: APIGuildTextChannel<0>, client: Client) {
    super(data.id, data.type, client);
    this.type = 0;
    const keys = Object.keys(data);
    keys.forEach((key) => {
      //@ts-ignore
      this[key as keyof this] = data[key as keyof APIGuildTextChannel<0>];
    });
  }
  /**
   *
   * @param message The message to send
   * @example
   * ```
   * client.guilds.get("1234567890").channels.get("12345678901234567").send("Hello World!");
   * ```
   * @returns Promise<void>
   *
   */
  async send?(message: string): Promise<void> {
    const res = await fetch(
      `https://discord.com/api/v10/channels/${this.id}/messages`,
      {
        body: JSON.stringify({
          content: message,
        }),
        headers: {
          "User-Agent": "undici/tej.js",
          Authorization: `Bot ${this.client.token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    if (res.status === 200) {
      const resp = (await res.json()) as any;
      if (resp.code) {
        throw new Error(resp.message);
      }
      return Promise.resolve();
    }
  }
  async sendRaw?(data: RESTPostAPIChannelMessageJSONBody): Promise<void> {
    const res = await fetch(
      `https://discord.com/api/v10/channels/${this.id}/messages`,
      {
        body: JSON.stringify(data),
        headers: {
          "User-Agent": "undici/tej.js",
          Authorization: `Bot ${this.client.token}`,
        },
        method: "POST",
      }
    );
    if (res.status === 200) {
      const resp = (await res.json()) as any;
      if (resp.code) {
        throw new Error(resp.message);
      }

      return Promise.resolve();
    }
  }
}

export default GuildTextChannel;
