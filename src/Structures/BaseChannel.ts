import Client from "./Client";
import TextChannel from "./TextChannel";
import { ChannelType } from "discord-api-types";
class BaseChannel {
  id: string = "";
  type: ChannelType;
  client: Client;
  constructor(id: string, type: number, Client: Client) {
    this.id = id;
    this.type = type;
    this.client = Client;
  }
  isGuildTextChannel(): this is TextChannel {
    return this.type === 0;
  }
}
export default BaseChannel;
