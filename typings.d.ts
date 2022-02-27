import { GatewayIntentBits, APIGuild, APIChannel } from "discord-api-types";
import { BaseChannel } from "./src/exports";
import TextChannel from "./src/Structures/TextChannel";
import { Client } from "../Structures/Client";
type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export interface IClientOptions {
  intents: GatewayIntentBits;
}
export interface GuildChannel extends BaseChannel, TextChannel {
  send?: (content: string) => Promise<Message>;
}
export type Guild = Override<APIGuild, { channels: Map<string, GuildChannel> }>;
export interface IClient {
  guilds: Map<string, Guild>;
  token: string;
}
