const { testServer, devs } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const command = localCommands.find(cmd => cmd.name === interaction.commandName);

        if (!command) return;

        if (command.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                return interaction.reply({
                    content: 'You cannot use this command.',
                    ephemeral: true
                });
            }
        } if (command.testOnly) {
            if (interaction.guildId !== testServer) {
                return interaction.reply({
                    content: 'You cannot use this command.',
                    ephemeral: true
                });
            }
        } if (command.permissionsRequired?.length) {
            for (const permission of command.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    return interaction.reply({
                        content: 'You cannot use this command.',
                        ephemeral: true
                    });
                }
            }
        } if (command.botPermissionsRequired?.length) {
            for (const permission of command.botPermissionsRequired) {
                if (!interaction.guild.members.me.permissions.has(permission)) {
                    return interaction.reply({
                        content: 'I do not have the required permissions to run this command.',
                        ephemeral: true
                    });
                }
            }
        }

        await command.callback(client, interaction);


    } catch (error) {
        console.error(error);
    }
};