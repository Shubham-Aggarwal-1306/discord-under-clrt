const { ApplicationCommandOptionType, Client, Interaction, PermissionFlagsBits } = require("discord.js");
const AutoRole = require("../../models/AutoRole");

module.exports = {
    /**
     * 
     * @param {Client} client In
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        if (!interaction.inGuild()) return interaction.reply('You can only use this command in a server!');

        try {
            const query = {
                guildId: interaction.guild.id,  
            };
            await interaction.deferReply();


            if (!(await AutoRole.exists(query))) {
                return interaction.editReply('There is no auto role set!');
            }

            await AutoRole.deleteOne(query);
            interaction.editReply(`The auto role has been disabled!`);
        } catch (err) {
            console.error("Error with auto role command: ", err);
        }
    },
    name: 'autorole-disable',
    description: 'Disable the auto role feature!',

    permissionsRequired: [PermissionFlagsBits.Administrator],
}