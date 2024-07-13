import { Client, Account } from "appwrite";

const client = new Client();


client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("668583aa0005a600f9b6");

  const account = new Account(client);

  export default account ;