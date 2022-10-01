import { Client } from '../src';

const client = new Client(process.env.VITE_HYPIXEL_API_KEY!);

void client.players.fetch('Thorin').then(console.log);
