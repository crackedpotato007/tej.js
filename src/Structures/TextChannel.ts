//@ts-nocheck
import { Channel } from "../../typings";

import { fetch } from "undici";
import BaseChannel from "./BaseChannel";
/**
 * The TextChanell is the class which represents a guild text channel
 * @extends BaseChannel
 * @example
 * ```
 * Client.guilds.get("12345678901234567").channels.get("12345678901234567");
 * ```
 *
 */
class TextChannel extends BaseChannel implements Channel {
  constructor(data: Channel) {
    super();
    const keys = Object.keys(data);
    keys.forEach((key) => {
      this[key] = data[key];
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
  async send(message: string) {
    console.log(this.id);
    const res = await fetch(
      `https://discord.com/api/v10/channels/${this.id}/messages`,
      {
        body: JSON.stringify({
          content: "Hello, World!",
        }),
        headers: {
          "User-Agent": "undici/tej.js",
          Authorization: `Bot ${this.client.token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    ).catch((err) => console.log(err));
    const resp = await res.json();
    if (resp.code) {
      throw new Error(resp.message);
    }
    return Promise.resolve();
  }
}

export default TextChannel;
