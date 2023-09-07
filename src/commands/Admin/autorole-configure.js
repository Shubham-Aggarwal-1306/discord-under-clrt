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

        const roleId = interaction.options.get('role').value;

        const query = {
            guildId: interaction.guild.id,  
        };

        try {

            await interaction.deferReply();

            let autoRole = await AutoRole.findOne(query);

            if (autoRole) {
                if (autoRole.roleId === roleId) {
                    return interaction.editReply('That role is already the auto role!');
                }
                autoRole.roleId = roleId;
            } else {
                autoRole = new AutoRole({
                    ...query,
                    roleId,
                });
            }

            await autoRole.save();

            interaction.editReply(`The auto role has been set to <@&${roleId}>!`);
        } catch (err) {
            console.error("Error with auto role command: ", err);
        }
    },
    name: 'autorole-configure',
    description: 'Configure the auto role feature!',
    options: [
        {
            name: 'role',
            description: 'The role to give to new members',
            type: ApplicationCommandOptionType.Role,
            required: true,
        },
    ],

    permissionsRequired: [PermissionFlagsBits.Administrator],

    botPermissionsRequired: [PermissionFlagsBits.ManageRoles],
}