import { events } from "bdsx/event";
import { latitude, longitude } from "../config.json";
import fs = require("fs");

export const REALTIME_TXT = "./realtime.txt";
if (!fs.existsSync(REALTIME_TXT)) {
    fs.writeFileSync(REALTIME_TXT, "true");
}

events.serverOpen.on(() => {
    if (!latitude) return console.log(new Error(`latitude is not set!`));
    if (!longitude) return console.log(new Error(`longitude is not set!`));
    import(`./setTime`);
});
