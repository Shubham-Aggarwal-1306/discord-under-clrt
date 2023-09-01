const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Bans A member from the server.",
    // devOnly: true,
    // testOnly: true,
    // ownerOnly: true,
    // deleted: false,
    options: [
        {
            name: "user",
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
            description: "The user to ban."
        },
        {
            name: "reason",
            type: ApplicationCommandOptionType.String,
            description: "The reason for the ban."
        }
    ],

    permissionsRequired: [PermissionFlagsBits.Administrator],

    botPermissionsRequired: [],

    callback: async (client, interaction) => {
        await interaction.reply(`Banned ${interaction.options.get("user").user.tag} for ${interaction.options.get("reason")?.value ?? "no reason provided"}.`);
    }
}