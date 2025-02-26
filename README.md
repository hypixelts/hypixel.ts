<div align="center">

![banner](https://raw.githubusercontent.com/hypixelts/assets/main/svg/full-nobg5232x945.svg)

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

hypixel.ts is a [NodeJS](https://nodejs.org) wrapper for the [Hypixel API](https://api.hypixel.net) which allows you to interact with it easily.

- Written in Typescript
- CommonJS, ESM support
- 100% coverage of Hypixel API

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

const client = new Client({ apiKeys: ['YOUR_API_KEY'] }).start();

client.players.fetch('armc').then(console.log);
```

Get a skyblock profile:

```typescript
import { Client } from 'hypixel.ts';

const client = new Client({ apiKeys: ['YOUR_API_KEY'] }).start();

client.skyblock.getProfile('lifelong').then(console.log);
```

## Links

- [Documentation](https://hypixel.js.org/)
- [Discord Server](https://discord.gg/DDTmaeYUMF)
- [Github](https://github.com/FC5570/hypixel.ts)
- [npm](https://npmjs.com/package/hypixel.ts)

## Help

If you're having issues with a method, or the wrapper isn't working as expected, you can join our [Discord Server](https://discord.gg/DDTmaeYUMF) or contact FC#5104.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://fc5570.me/"><img src="https://avatars.githubusercontent.com/u/68158483?v=4?s=100" width="100px;" alt="FC"/><br /><sub><b>FC</b></sub></a><br /><a href="https://github.com/hypixelts/hypixel.ts/commits?author=FC5570" title="Code">💻</a> <a href="#ideas-FC5570" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-FC5570" title="Maintenance">🚧</a> <a href="#projectManagement-FC5570" title="Project Management">📆</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/chriscn"><img src="https://avatars.githubusercontent.com/u/25829276?v=4?s=100" width="100px;" alt="Christopher Nethercott"/><br /><sub><b>Christopher Nethercott</b></sub></a><br /><a href="https://github.com/hypixelts/hypixel.ts/commits?author=chriscn" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/goalqm"><img src="https://avatars.githubusercontent.com/u/111326646?v=4?s=100" width="100px;" alt="alqm"/><br /><sub><b>alqm</b></sub></a><br /><a href="https://github.com/hypixelts/hypixel.ts/commits?author=goalqm" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
