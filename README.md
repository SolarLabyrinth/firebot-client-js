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
import { FirebotApi } from "@solarlabyrinth/firebot-client";

const firebot = new FirebotApi("http://localhost:7472");

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

await firebot.getCounters();
await firebot.getCounter("94ca0cbd-1c30-4800-8c84-2d4ca8450587");
// Add 1 to the counter
await firebot.updateCounter("94ca0cbd-1c30-4800-8c84-2d4ca8450587", 1, true);
// Set the counter to 10.
await firebot.updateCounter("94ca0cbd-1c30-4800-8c84-2d4ca8450587", 10, false);
```
