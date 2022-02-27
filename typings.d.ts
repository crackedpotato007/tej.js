import { GatewayIntentBits, APIGuild, APIChannel } from 'discord-api-types'
import { BaseChannel } from './src/exports'
import TextChannel from './src/Structures/TextChannel'
import { Client } from '../Structures/Client'
type Override<T1, T2> = Omit<T1, keyof T2> & T2
export interface IClientOptions {
	intents: GatewayIntentBits
}
<<<<<<< HEAD

export type Guild = Override<APIGuild, { channels: Map<string, Channel> }>
=======
export interface GuildChannel extends BaseChannel, TextChannel {
  send?: (content: string) => Promise<Message>;
}
export type Guild = Override<APIGuild, { channels: Map<string, GuildChannel> }>;
>>>>>>> 89d387ebdf7dd2bcca71c65ac5411ae393f2adb8
export interface IClient {
	guilds: Map<string, Guild>
	token: string
}
<<<<<<< HEAD

export interface GuildChannel extends BaseChannel, TextChannel {
	send?
}
=======
>>>>>>> 89d387ebdf7dd2bcca71c65ac5411ae393f2adb8
