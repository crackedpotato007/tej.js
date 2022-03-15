import { APIVoiceChannel } from "discord-api-types/v10";
import { WebSocket } from "ws";
import BaseChannel from "./BaseChannel";
import Client from "./Client";
/**
 * The GuildVoiceChannel class is a class that contains information and methods for a guild voice channel.
 * @extends BaseChannel
 * @example
 * ```
 * Client.guilds.get("12345678901234567").channels.get("12345678901234567");
 * ```
 *
 */
interface GuildVoiceChannel extends APIVoiceChannel {
  type: 2;
}
class GuildVoiceChannel extends BaseChannel {
  constructor(data: APIVoiceChannel, client: Client) {
    super(data.id, data.type, client);
    const keys = Object.keys(data);
    keys.forEach((key) => {
      //@ts-ignore
      this[key as keyof this] = data[key as keyof APIVoiceChannel];
    });
  }
  /**
   *
   * @example
   * ```
   * client.guilds.get("1234567890").channels.get("12345678901234567").connect();
   * ```
   * @returns Promise<void>
   *
   */
  async connect() {
    let session_id: string;
    let endpoint: string;
    let heartbeat_interval: number;
    let interval_registered = false;
    let ws: WebSocket;
    const payload = {
      op: 4,
      d: {
        guild_id: this.guild_id,
        channel_id: this.id,
        self_mute: false,
        self_deaf: false,
      },
    };
    this.client.ws.on("message", (data) => {
      const res = JSON.parse(data.toString());

      if (res.t === "VOICE_STATE_UPDATE") session_id = res.d.session_id;
      if (res.t === "VOICE_SERVER_UPDATE") {
        endpoint = res.d.endpoint;
        const idpayload = {
          op: 0,
          d: {
            server_id: this.guild_id,
            user_id: this.client.user.id,
            session_id: session_id,
            token: res.d.token,
          },
        };
        ws = new WebSocket("wss://" + endpoint + "?v=4");

        ws.on("message", (data) => {
          const res = JSON.parse(data.toString());
          if (res.op === 8) heartbeat_interval = res.d.heartbeat_interval;
          if (res.op === 2) {
            setInterval(() => {
              ws.send(JSON.stringify({ op: 3, d: Date.now() }));
            }, heartbeat_interval);
          }
        });
        ws.on("open", () => {
          ws.send(JSON.stringify(idpayload));
        });
      }
    });
    this.client.ws.send(JSON.stringify(payload));
  }
}

export default GuildVoiceChannel;
