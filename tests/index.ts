import { Client } from '../src';

const client = new Client(process.env.HYPIXEL_API_KEY!);

void client.players.fetch('armc').then(console.log);
