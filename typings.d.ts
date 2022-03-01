import { GatewayIntentBits, APIGuild, APIChannel } from "discord-api-types";
import { BaseChannel } from "./src/exports";
import TextChannel from "./src/Structures/TextChannel";
import { Client } from "../Structures/Client";
export interface IClientOptions {
  intents: GatewayIntentBits;
}
export interface GuildChannel extends BaseChannel, TextChannel {
  send?: (content: string) => Promise<Message>;
}
export interface IGuild extends Omit<APIGuild, "channels"> {
  client: Client;
  channels: {
    cache: Map<string, GuildChannel>;
  };
}
export interface IClient {
  guilds: Map<string, Guild>;
  token: string;
}
