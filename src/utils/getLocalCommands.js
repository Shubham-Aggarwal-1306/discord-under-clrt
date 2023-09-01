const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = (exceptions = []) => {
    let localCommands = [];

    const commandCategories = getAllFiles(path.join(__dirname, "..", "commands"), true);

    for (const category of commandCategories) {
        const commandFiles = getAllFiles(category);

        for (const file of commandFiles) {
            const commandObject = require(file);
            if (exceptions.includes(commandObject.name)) continue;
            localCommands.push(commandObject);
        }
    }

    return localCommands;

};