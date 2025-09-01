import { FirebotApi } from "../src/client.js";

const firebot = new FirebotApi("http://localhost:7472");
console.log(await firebot.getStatus());

console.log(await firebot.getEffects());
console.log(await firebot.getEffect("firebot:obs-set-browser-source-url"));
console.log(await firebot.getPresetEffectLists());

console.log(await firebot.getViewers());
console.log(await firebot.exportViewers());
console.log(await firebot.getViewer("58113305"));

console.log(await firebot.getCustomVariable("test"));
console.log(await firebot.setCustomVariable("test", "example", 1000));
console.log(await firebot.getCustomVariable("test"));
console.log(await firebot.getCustomVariables());

console.log(await firebot.getCounter("94ca0cbd-1c30-4800-8c84-2d4ca8450587"));
console.log(
  await firebot.updateCounter("94ca0cbd-1c30-4800-8c84-2d4ca8450587", 1)
);
console.log(
  await firebot.updateCounter("94ca0cbd-1c30-4800-8c84-2d4ca8450587", 7, true)
);
console.log(await firebot.getCounters());
