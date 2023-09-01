const { testServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, testServer);

        for (const command of localCommands) {
            const { name, description, options } = command;
            const existingCommand = await applicationCommands.cache.find(cmd => cmd.name === name);

            if (existingCommand) {
                if (command.deleted) {
                    await existingCommand.delete();
                    console.log(`[INFO] Deleted command ${name}`);
                    continue;
                }
                if (areCommandsDifferent(existingCommand, command)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options
                    });

                    console.log(`[INFO] Edited command ${name}`);
                }
            } else {
                if (command.deleted) {
                    console.log(`[INFO] Command ${name} already deleted`);
                    continue;
                }
                await applicationCommands.create(command);
                console.log(`[INFO] Created command ${name}`);
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};