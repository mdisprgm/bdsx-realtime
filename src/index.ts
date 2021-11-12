import { events } from "bdsx/event";
import { location } from "../config.json";
import fs = require("fs");
import { red } from "colors";

export const REALTIME_TXT = "./realtime.txt";
if (!fs.existsSync(REALTIME_TXT)) {
    fs.writeFileSync(REALTIME_TXT, "true");
}

events.serverOpen.on(() => {
    import(`./config`);
    setTimeout(() => {
        const { location } = require(`../config.json`);
        if (!location.latitude)
            return console.log(
                red(
                    `[Realtime] Latitude is not correct. Please modify the config file and run the server again.`
                )
            );
        if (!location.longitude)
            return console.log(
                red(
                    `[Realtime] Longitude is not correct. Please modify the config file and run the server again.`
                )
            );
        import(`./setTime`);
    }, 100);
});
