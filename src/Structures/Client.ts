import { EventEmitter } from 'events'
import { IClient, IClientOptions } from '../../typings'
import { WebSocket } from 'ws'
import { fetch } from 'undici'
import { startCaching } from '../REST/cache'
import { GatewayReceivePayload, APIUnavailableGuild } from 'discord-api-types'
import { Guild } from '../../typings'
interface gateway {
	url: string
	shards: number
	session_start_limit: {
		total: number
		remaining: number
		reset_after: number
		max_concurrency: number
	}
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
	token: string = ''
	guilds: Map<string, Guild> = new Map()

	constructor() {
		super()
	}
	async start(token: string) {
		this.token = token
		let existingGuilds: APIUnavailableGuild[] = []
		const res = await fetch('https://discord.com/api/v10/gateway/bot', {
			headers: {
				Authorization: `Bot ${token}`,
				'user-agent': 'undici/discord.js'
			}
		})
		if (res.status !== 200) {
			throw new Error(`${res.status} ${res.statusText}`)
		}

		const data = (await res.json()) as gateway
		const ws = new WebSocket(data.url + '/?v=9&encoding=json')
		let interval = 0
		let s: null | number = null
		ws.on('open', () => {
			ws.send(
				JSON.stringify({
					op: 2,
					d: {
						token,
						properties: {
							$os: 'linux',
							$browser: 'undici/tej.js',
							$device: 'undici/tej.js'
						},
						intents: 14023
					}
				})
			)
		})

		ws.on('message', async data => {
			const res = JSON.parse(data.toString()) as GatewayReceivePayload
			if (res.t === 'READY') {
				existingGuilds = res.d.guilds
				await startCaching(this, this.token)
			}
			s = res.s
			if (res.op === 11) return
			if (res.op === 10) {
				interval = res.d.heartbeat_interval
				setInterval(() => {
					ws.send(
						JSON.stringify({
							op: 1,
							d: s
						})
					)
				}, interval)
			}
			if (res.t) {
				if (
					res.t === 'GUILD_CREATE' &&
					existingGuilds.find(g => g.id === res.d.id)
				)
					return

				this.emit(res.t, res.d)
			}
		})
		return this
	}
}
<<<<<<< HEAD
export default Client
const client = new Client()
client.start('ODQ3NDM3MzkwNjU0MjEwMTE4.YK-Dkg.DArEL7UWXgLw_g2LNeEtiCTxkhQ')
client.guilds
	.get('779679929242746920')
	?.channels.get('780106253493207051')
	?.send('Hello, World!')
=======
export default Client;
const client = new Client();
client.start("ODQ3NDM3MzkwNjU0MjEwMTE4.YK-Dkg.DArEL7UWXgLw_g2LNeEtiCTxkhQ");
const chan = client.guilds
  .get("779679929242746920")
  ?.channels.get("780106253493207051");
if (chan?.isGuildTextChannel()) {
  chan.send("test");
}
>>>>>>> 89d387ebdf7dd2bcca71c65ac5411ae393f2adb8
