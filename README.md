# @solarlabyrinth/firebot-client

A client library for the Firebot API. Tested against Firebot v5.64.0

## Installation

```bash
npm install @solarlabyrinth/firebot-client

yarn add @solarlabyrinth/firebot-client

bun add @solarlabyrinth/firebot-client
```

## Usage

```typescript
import { FirebotClient } from "@solarlabyrinth/firebot-client";

const firebot = new FirebotClient("http://localhost:7472");

await firebot.getStatus();

await firebot.getEffects();
await firebot.getEffect("firebot:obs-set-browser-source-url");
await firebot.getPresetEffectLists();

await firebot.getCustomVariable("test");
await firebot.setCustomVariable("test", "example", 1000);
await firebot.getCustomVariables();

await firebot.getReplaceVariables();

await firebot.getViewers();
await firebot.exportViewers();
await firebot.getViewer("1111111111");

const counterId = "94ca0cbd-1c30-4800-8c84-2d4ca8450587";
await firebot.getCounters();
await firebot.getCounter(counterId);
// Add 1 to the counter
await firebot.updateCounter(counterId, 1, true);
// Set the counter to 10.
await firebot.updateCounter(counterId, 10, false);

const timerId = "09ddcae0-94b0-11ef-a33b-371e00c340c1";
await firebot.getTimers();
await firebot.getTimer(timerId);
await firebot.enableTimer(timerId);
await firebot.disableTimer(timerId);
await firebot.toggleTimer(timerId);
await firebot.clearTimer(timerId);

const queueId = "28899a40-af91-11ef-a872-81b56b0d156a";
await firebot.getEffectQueues();
await firebot.getEffectQueue(queueId);
await firebot.pauseEffectQueue(queueId);
await firebot.resumeEffectQueue(queueId);
await firebot.toggleEffectQueue(queueId);
await firebot.clearEffectQueue(queueId);
```
