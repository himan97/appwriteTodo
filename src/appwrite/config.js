import { Client, Account,Databases,Storage } from "appwrite";

const client = new Client();


client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

  const account = new Account(client);
  const database = new Databases(client);
  const storage = new Storage(client);

  export {database,account,storage}  ;