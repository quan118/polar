# 🐻‍❄️ Polar Desktop

Another HTTP Client

## Contents

1. [Setup runtime](#runtime)
2. [Setup App](#app)
3. [Run App](#run-app)
4. [Run Unit Tests](#run-unit-test)
5. [Store Structure Overview](#store-structure-overview)

## <a id="runtime">Setup runtime</a>:

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

## <a id="app">Setup App</a>

#### Install project dependencies

```bash
yarn install
```

## <a id="run-app">Run App</a>

```bash
yarn tauri dev
```

## <a id="run-unit-tests">Run Unit Tests</a>

```bash
yarn test
```

## <a id="store-structure">Store Structure Overview</a>

```
Work (Space)
  |
  |-Twitter (Collection)
  |   |
  |   |- Session (CollectionItem - Group)
  |   |   |- POST https://api.twitter.com/login (CollectionItem - Request)
  |   |   |- POST https://api.twitter.com/logout (CollectionItem - Request)
  |   |- GET https://api.twitter.com/tweet?id=190 (CollectionItem - Request)
  |-Facebook (Collection)
      |
      |- ...
```
