//@ts-nocheck
import { APIChannel } from "discord-api-types";
import { Channel } from "../../typings";
import Client from "./Client";
import { fetch } from "undici";
import BaseChannel from "./BaseChannel";
class TextChannel extends BaseChannel implements Channel {
  constructor(data: Channel) {
    super();
    const keys = Object.keys(data);
    keys.forEach((key) => {
      this[key] = data[key];
    });
  }
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
