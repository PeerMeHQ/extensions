# Peerme Extensions

Extensions (Apps & Widgets) for the DAOs on [peerme.io](https://peerme.io). For a general overview, please visit our [Knowledge Base](https://know.superciety.com/developers/extensions.html).

[![npm (scoped)](https://img.shields.io/npm/v/@peerme/extensions?style=for-the-badge)](https://www.npmjs.com/package/@peerme/extensions)

## Available Extensions

- Coindrip: [coindrip.finance](https://coindrip.finance)

## Create your App

> Please get in touch or create a Github Issue before starting to work on your integration!

### Overview

1. Fork this repository & work on it locally
2. Make a copy of `extensions/_template` and adapt it to your needs
3. Register your extension in the root's `config.ts`
4. Start & keep working inside this directory
5. Create a pull request with your changes to this repository when done

### Guidelines

- Don't pull in any dependencies that are not absolutely necessary.
- Only work inside the working directory of your extension

### Installation

To install the repository run:

```bash
npm install
```

### Run the Dev-Server

To start working, run the development server which opens a [NextJs](https://nextjs.org) app with a development environment:

```bash
cd dev
npm install # only once
npm run dev
```

After doing changes to your extension, you may need to run `npm run build` from the root of the repository while keeping the dev-server running.
