import Client from "./Client";

class BaseChannel {
  id: string = "";
  type: number = 0;
  client: Client;
  constructor(id: string, type: number, Client: Client) {
    this.id = id;
    this.type = type;
    this.client = Client;
  }
}
export default BaseChannel;
