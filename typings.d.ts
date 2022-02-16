import { GatewayIntentBits, APIGuild, APIChannel } from "discord-api-types";
import { Client } from "../Structures/Client";
type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export interface IClientOptions {
  intents: GatewayIntentBits;
}

export interface Channel {
  client: Client;
  send(message: string): Promise<void>;
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
}

export type Guild = Override<APIGuild, { channels: Map<string, Channel> }>;
export interface IClient {
  guilds: Map<string, Guild>;
  token: string;
}
