import { FireBotApi } from "../src/client.js";

const firebot = new FireBotApi("http://localhost:7472");
console.log(await firebot.getEffects());
console.log(await firebot.getEffect("firebot:obs-set-browser-source-url"));
console.log(await firebot.getPresetEffectLists());
console.log(await firebot.getCustomVariable("test"));
console.log(await firebot.setCustomVariable("test", "example", 1000));
console.log(await firebot.getCustomVariable("test"));
console.log(await firebot.getCustomVariables());
console.log(await firebot.getViewers());
console.log(await firebot.exportViewers());
console.log(await firebot.getViewer("58113305"));
