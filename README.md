<div align="center">

![banner](https://i.imgur.com/FYGGv8l.png)

## **An easy to use [Hypixel API](https://api.hypixel.net) wrapper.**

<p>
    <a href="https://www.npmjs.com/package/hypixel.ts"><img src="https://img.shields.io/npm/v/hypixel.ts.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/hypixel.ts"><img src="https://img.shields.io/npm/dt/hypixel.ts.svg?maxAge=3600" alt="npm downloads" /></a>
    <br />
    <br />
    <a href="https://discord.gg/DDTmaeYUMF"><img src="https://discord.com/api/guilds/931071635119833089/embed.png?style=banner2" alt="discord server" /></a>
</p>
</div>

## About

hypixel.ts is a [NodeJS](https://nodejs.org) module which allows you to interact with the [Hypixel API](https://api.hypixel.net) easily.

-   Written in Typescript
-   CommonJS, ESM support
-   100% coverage of Hypixel API

## Installation

**Node.js 14+ or newer is required**

```bash
npm install hypixel.ts
yarn add hypixel.ts
pnpm add hypixel.ts
```

## Example Usage

Get the info of a player:

```typescript
import { Client } from 'hypixel.ts';

const client = new Client('API_KEY');

client.players.fetch('armc').then(console.log);
```

Get a skyblock profile:

```typescript
import { Client } from 'hypixel.ts';

const client = new Client('API_KEY');

client.skyblock.getProfile('lifelong').then(console.log);
```

## Links

-   [Documentation](https://hypixel.js.org/)
-   [Discord Server](https://discord.gg/DDTmaeYUMF)
-   [Github](https://github.com/FC5570/hypixel.ts)
-   [npm](https://npmjs.com/package/hypixel.ts)

## Help

If you're having issues with a method, or the wrapper isn't working as expected, you can join our [Discord Server](https://discord.gg/DDTmaeYUMF) or contact FC#5104.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
