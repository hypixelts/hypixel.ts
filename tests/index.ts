import { Client } from '../src';

const client = new Client('bc7928bf-fbbd-48f4-afce-0b553b0f4bc3');

void client.players.fetch('armc').then((player) => {
	console.log(player);
});
