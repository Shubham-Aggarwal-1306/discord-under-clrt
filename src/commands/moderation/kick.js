const {Client, Interaction , ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        const target = interaction.options.get("user").value;
        const reason = interaction.options.get("reason")?.value || "No reason provided.";
        await interaction.deferReply();
        const targetUser = await interaction.guild.members.fetch(target);
        if (!targetUser) return interaction.editReply("User not found.");
        if (targetUser.id === interaction.guild.ownerId) return interaction.editReply("You cannot kick the owner.");
        if (targetUser.id === interaction.member.id) return interaction.editReply("You cannot kick yourself.");
        if (targetUser.id === client.user.id) return interaction.editReply("You cannot kick me.");
        if (targetUser.roles.highest.position >= interaction.member.roles.highest.position) return interaction.editReply("You cannot kick this user.");
        if (targetUser.roles.highest.position >= interaction.guild.members.me.roles.highest.position) return interaction.editReply("I cannot kick this user.");
        try {
        await targetUser.kick({ reason });
        await interaction.editReply(`Kicked ${targetUser.user.tag} for ${reason}`);
        } 
        catch(error) {
            console.log("There was an error while kicking the user", error)
        }
    },
    name: "kick",
    description: "kicks A member from the server.",
    // devOnly: true,
    // testOnly: true,
    // ownerOnly: true,
    // deleted: false,
    options: [
        {
            name: "user",
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
            description: "The user to kick."
        },
        {
            name: "reason",
            type: ApplicationCommandOptionType.String,
            description: "The reason for the kick."
        }
    ],

    permissionsRequired: [PermissionFlagsBits.KickMembers],

    botPermissionsRequired: [PermissionFlagsBits.KickMembers],
}