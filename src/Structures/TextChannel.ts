//@ts-nocheck
import { APIChannel } from "discord-api-types";
import { Channel } from "../../typings";
import Client from "./Client";
import { fetch } from "undici";
class ChannelClass implements Channel {
  client: Client;
  id: string;
  type: string;
  name: string;
  guild_id: string;
  position: number;
  permission_overwrites: any;
  nsfw: boolean;
  topic: string;
  last_message_id: string;
  bitrate: number;
  user_limit: number;
  rate_limit_per_user: number;
  recipients: any[];
  icon: string;
  owner_id: string;
  application_id: string;
  parent_id: string;
  last_pin_timestamp: string;
  nicks: any[];
  verification_level: number;
  explicit_content_filter: number;
  read_only: boolean;
  permissions: number;
  system_channel_flags: number;
  created_at: string;
  updated_at: string;
  last_message_pin_timestamp: string;
  message_notifications: number;
  type_: number;
  constructor(data: Channel) {
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

export default ChannelClass;
