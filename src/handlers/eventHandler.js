const getAllFiles = require("../utils/getAllFiles");
const path = require("path");

module.exports = (client) => {
    const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

    for (const folder of eventFolders) {
        const eventFiles = getAllFiles(folder);
        eventFiles.sort((a, b) => a > b );
        const eventName = folder.replace(/\\/g, "/").split("/").pop();
        client.on(eventName, async (arg) => {
            for (const file of eventFiles) {
                const event = require(file);
                await event(client, arg);
            }
        });
    }
};