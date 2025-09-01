# @solarlabyrinth/firebot-client

A client library for the Firebot API.

## Installation

```bash
npm install @solarlabyrinth/firebot-client

yarn add @solarlabyrinth/firebot-client

bun add @solarlabyrinth/firebot-client
```

## Usage

```typescript
import { FireBotApi } from "@solarlabyrinth/firebot-client";

const firebot = new FireBotApi("http://localhost:7472");

await firebot.getStatus();

await firebot.getEffects();
await firebot.getEffect("firebot:obs-set-browser-source-url");
await firebot.getPresetEffectLists();

await firebot.getCustomVariable("test");
await firebot.setCustomVariable("test", "example", 1000);
await firebot.getCustomVariables();

await firebot.getViewers();
await firebot.exportViewers();
await firebot.getViewer("1111111111");
```
