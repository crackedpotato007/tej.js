<<<<<<< HEAD
import Client from './Client'

class BaseChannel {
	id: string = ''
	type: number = 0
	client: Client
	constructor(id: string, type: number, Client: Client) {
		this.id = id
		this.type = type
		this.client = Client
	}
=======
import Client from "./Client";
import TextChannel from "./TextChannel";
class BaseChannel {
  id: string = "";
  type: number = 0;
  client: Client;
  constructor(id: string, type: number, Client: Client) {
    this.id = id;
    this.type = type;
    this.client = Client;
  }
  isGuildTextChannel(): this is TextChannel {
    return this.type === 0;
  }
>>>>>>> 89d387ebdf7dd2bcca71c65ac5411ae393f2adb8
}
export default BaseChannel
