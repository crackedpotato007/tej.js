import {
  GatewayIntentBits,
  APIGuild,
  APIChannel,
  APIUser,
} from "discord-api-types";
import { BaseChannel } from "./src/exports";
import TextChannel from "./src/Structures/GuildTextChannel";
import { Client } from "../Structures/Client";
import { WebSocket } from "ws";
import GuildVoiceChannel from "./src/Structures/GuildVoiceChat";
export interface IClientOptions {
  intents: GatewayIntentBits;
}
export interface GuildChannel
  extends BaseChannel,
    TextChannel,
    GuildVoiceChannel {
  send?: (content: string) => Promise<Message>;
  connect?: () => Promise<void>;
}
export interface IGuild extends Omit<APIGuild, "channels"> {
  client: Client;
  channels: {
    cache: Map<string, GuildChannel>;
  };
}
export interface IClient {
  guilds: Map<string, IGuild>;
  token: string;
  ws: WebSocket;
  user: APIUser;
}
