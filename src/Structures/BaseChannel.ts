import Client from "./Client";
import TextChannel from "./GuildTextChannel";
import { ChannelType } from "discord-api-types";
import GuildVoiceChannel from "./GuildVoiceChat";
class BaseChannel {
  id: string = "";
  type: ChannelType;
  client: Client;
  constructor(id: string, type: number, Client: Client) {
    this.id = id;
    this.type = type as ChannelType;
    this.client = Client;
  }
  isGuildTextChannel(): this is TextChannel {
    return this.type === 0;
  }
  isGuildVoiceChannel(): this is GuildVoiceChannel {
    return this.type === 2;
  }
}
export default BaseChannel;
