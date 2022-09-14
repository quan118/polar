# Postpone

Another HTTP Client

## Contents

1. [Setup runtime](#runtime)
2. [Setup App](#app)

## Setup <a id="runtime">runtime</a>:

This project uses [asdf](https://github.com/asdf-vm/asdf#why-use-asdf)
for runtime management. Install it
[here](https://asdf-vm.com/#/core-manage-asdf).

```bash
asdf install
```

Then verify correct package runtime is used.

eg.

```bash
which node
# ~/.asdf/shims/node
```

```bash
node -v
# v16.13.0
```

## Setup <a id="app">App</a>

#### Install project dependencies

```bash
yarn install
```

## Run

```bash
yarn tauri dev
```

## Run Unit Test

```bash
yarn test
```
