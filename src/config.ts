import { mkdir, readFileSync, writeFileSync } from "fs";

const configFilePath = `../plugins/realtime/config.json`;
const defaultConfig = {
    location: {
        latitude: null,
        longitude: null,
    },
};

mkdir(`../plugins_data`, () => {});
mkdir(`../plugins_data/realtime`, () => {});

try {
    JSON.parse(readFileSync(configFilePath, `utf8`));
} catch (err) {
    writeFileSync(
        configFilePath,
        JSON.stringify(defaultConfig, null, 2),
        `utf8`
    );
}
