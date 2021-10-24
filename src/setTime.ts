import { serverInstance } from "bdsx/bds/server";
import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { timeAdapter } from "./timeAdapter";
import fs = require("fs");
import { REALTIME_TXT } from ".";
import { command } from "bdsx/command";
import { CommandPermissionLevel } from "bdsx/bds/command";

function isTrue(s: string) {
    return s !== "false";
}
const level = serverInstance.minecraft.getLevel();

const setTime = setInterval(() => {
    const enabled = fs.readFileSync(REALTIME_TXT, "utf8");
    if (isTrue(enabled)) {
        level.setTime(0);
        timeAdapter.updateTimeAdapter();
        const tick = timeAdapter.getCurrentTick();
        if (timeAdapter.lastTick !== tick) {
            timeAdapter.lastTick = tick;
        }
        level.setTime(tick);
    }
}, 100);
events.serverStop.on(() => {
    clearInterval(setTime);
});

command
    .register("realtime", "realtime on/off", CommandPermissionLevel.Operator)
    .overload(
        async (p, o, op) => {
            switch (p.swt) {
                case "on":
                    bedrockServer.executeCommand(
                        `gamerule dodaylightcycle false`
                    );
                    fs.writeFileSync(REALTIME_TXT, "true");
                    op.success("Realtime is §aenabled");
                    break;
                case "off":
                    bedrockServer.executeCommand(
                        `gamerule dodaylightcycle true`
                    );
                    fs.writeFileSync(REALTIME_TXT, "false");
                    op.success("Realtime is §cdisabled");
                    break;
            }
        },
        {
            swt: command.enum("RealTimeSwitch", "on", "off"),
        }
    );
