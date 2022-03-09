import { EventEmitter } from "events";
import { IClient } from "../../typings";
import { WebSocket } from "ws";
import { fetch } from "undici";
import { startCaching } from "../REST/cache";
import {
  GatewayReceivePayload,
  APIUnavailableGuild,
  APIUser,
} from "discord-api-types";
import { IGuild } from "../../typings";
interface gateway {
  url: string;
  shards: number;
  session_start_limit: {
    total: number;
    remaining: number;
    reset_after: number;
    max_concurrency: number;
  };
}
/**
 * The Client class is the main class for the library.
 * It handles the connection to the Discord gateway and
 * provides a simple interface for interacting with the
 * rest of the library.
 * @extends EventEmitter
 * @example
 * ```
 * const client = new Client({
 * intents: [
 * "GUILDS",
 * "GUILD_MEMBERS",
 * "GUILD_BANS",
 * ]
 * });
 * client.on("ready", () => {
 * console.log("Ready!");
 * });
 * client.login(token)
 * ```
 */
class Client extends EventEmitter implements IClient {
  token: string = "";
  guilds: Map<string, IGuild> = new Map();
  ws = {} as WebSocket;
  user: APIUser = {} as APIUser;
  constructor() {
    super();
  }
  async start(token: string) {
    this.token = token;
    const myuser = await fetch(`https://discord.com/api/v10/users/@me`, {
      headers: {
        Authorization: `Bot ${this.token}`,
        "User-Agent": "undici/tej.js",
        encoding: "json",
      },
    });
    if (myuser.status !== 200) {
      throw new Error(`${myuser.status} ${myuser.statusText}`);
    }
    this.user = (await myuser.json()) as APIUser;
    let existingGuilds: APIUnavailableGuild[] = [];
    const res = await fetch("https://discord.com/api/v10/gateway/bot", {
      headers: {
        Authorization: `Bot ${token}`,
        "user-agent": "undici/discord.js",
      },
    });
    if (res.status !== 200) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as gateway;
    const ws = new WebSocket(data.url + "/?v=9&encoding=json");
    let interval = 0;
    let s: null | number = null;
    this.ws = ws;
    ws.on("open", () => {
      ws.send(
        JSON.stringify({
          op: 2,
          d: {
            token,
            properties: {
              $os: "linux",
              $browser: "undici/tej.js",
              $device: "undici/tej.js",
            },
            intents: 14023,
          },
        })
      );
    });

    ws.on("message", async (data) => {
      const res = JSON.parse(data.toString()) as GatewayReceivePayload;
      if (res.t === "READY") {
        existingGuilds = res.d.guilds;
        await startCaching(this, this.token);
      }
      s = res.s;
      if (res.op === 11) return;
      if (res.op === 10) {
        interval = res.d.heartbeat_interval;
        setInterval(() => {
          ws.send(
            JSON.stringify({
              op: 1,
              d: s,
            })
          );
        }, interval);
      }
      if (res.t) {
        if (
          res.t === "GUILD_CREATE" &&
          existingGuilds.find((g) => g.id === res.d.id)
        )
          return;

        this.emit(res.t, res.d);
      }
    });
    return this;
  }
}
export default Client;
