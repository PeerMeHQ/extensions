# Peerme Extensions

Extensions (Apps & Widgets) for the DAOs on [peerme.io](https://peerme.io). For a general overview, please visit our [Knowledge Base](https://know.peerme.io/developers/extensions.html).

[![npm (scoped)](https://img.shields.io/npm/v/@peerme/extensions?style=for-the-badge)](https://www.npmjs.com/package/@peerme/extensions)

## Available Extensions

- Coindrip: [coindrip.finance](https://coindrip.finance)

## Create your App

> Please get in touch or create a Github Issue before starting to work on your integration!

### Overview

1. Fork this repository & work on it locally
2. Make a copy of `src/extensions/_template` and adapt it to your needs
3. Register your extension in `src/config.ts`
4. Start & keep working inside this directory
5. Create a pull request with your changes to this repository when done

### Guidelines

- Don't pull in any dependencies that are not absolutely necessary
- Only work inside the working directory of your extension
- Keep the code as clean as possible by following [our Clean Code Guidelines](https://know.peerme.io/developers/clean-code.html)

### Installation

To install the repository run:

```bash
npm install
```

### Run the Dev-Server

To start working, run the development server which opens a [NextJs](https://nextjs.org) app with a development environment:

```bash
npm run dev
```

### Framework

The Extension Framework provides developers with useful components & utilities to quickly develop their integrations.

By default, each App makes use of the `useApp` hook which exposes useful functions to hook into the main [peerme.io](https://peerme.io) application for DAOs:

- `app.requestProposalAction(...)`: assemble a transaction/smart contract call to be attached to a proposal
- `app.showToast(...)`: show a toast message to the user

To use these app hook functions in child components, simply pass it to them as a prop with type `AppHook`.

**UI Components you can use from** `src/ui/elements`:

- `<AppSection />`: use to structure your app in sections

**UI Components you can use from** `@peerme/web-ui`:

Form components:

- `<Button />`
- `<Input />`
- `<Textarea />`
- `<Editor />`: use to collect formatted text input (HTML)
- `<Select />`
- `<Dropdown />`
- `<LinkButton />`
- `<Pagination />`
- `<RadioGroup />`
- `<Switch />`
- `<Slider />`
- `<UserSelector />`: use select a user (recommended when asking for e.g. blockchain address)
- `<EntitySelector />`: use to select a registered DAO
- `<PaymentSelector />`: use to select assets from the [DAO Vault](https://know.peerme.io/daos/vault.html)

User components:

- `<AddressPresenter />`: use to show blockchain addresses with link to the MultiversX Explorer

Feedback components:

- `<Alert />`
- `<Tooltip />`

Loaders components:

- `<EllipsisLoader />`
