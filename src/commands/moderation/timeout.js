const { ApplicationCommandOptionType, PermissionFlagsBits, Client, Interaction } = require('discord.js');
const ms = require('ms');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */

    callback: async (client, interaction) => {
        const mentionedUser = interaction.options.get("user").value;
        const duration = interaction.options.get("duration").value; // 1d, 1h, 1m, 1s
        const reason = interaction.options.get("reason")?.value || "No reason provided.";

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(mentionedUser);
        if (!targetUser) return interaction.editReply("User not found.");
        if (targetUser.user.bot) return interaction.editReply("You cannot timeout a bot.");

        const msDuration = ms(duration);

        if (isNaN(msDuration)) return interaction.editReply("Invalid duration.");

        if (msDuration < 5000 || msDuration > 2.419e9) return interaction.editReply("Duration must be between 5 seconds and 28 days.");

        if (targetUser.id === interaction.guild.ownerId) return interaction.editReply("You cannot timeout the owner.");
        if (targetUser.id === interaction.member.id) return interaction.editReply("You cannot timeout yourself.");
        if (targetUser.id === client.user.id) return interaction.editReply("You cannot timeout me.");
        if (targetUser.roles.highest.position >= interaction.member.roles.highest.position) return interaction.editReply("You cannot timeout this user.");
        if (targetUser.roles.highest.position >= interaction.guild.members.me.roles.highest.position) return interaction.editReply("I cannot timeout this user.");

        try {
            const { default: prettyMs } = await import('pretty-ms');
            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(`Time out for ${targetUser.user.tag} has been reset to ${prettyMs(msDuration)} for ${reason}`);
                return;
            }
            await targetUser.timeout(msDuration, reason);
            await interaction.editReply(`Timed out ${targetUser.user.tag} for ${prettyMs(msDuration)} for ${reason}`);
        } catch (error) {
            console.log("There was an error while timing out the user", error);
        }
    },
    name: "timeout",
    description: "Timeouts a member.",
    options: [
        {
            name: "user",
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
            description: "The user to timeout."
        },
        {
            name: "duration",
            type: ApplicationCommandOptionType.String,
            required: true,
            description: "The duration of the timeout."
        },
        {
            name: "reason",
            type: ApplicationCommandOptionType.String,
            description: "The reason for the timeout."
        }
    ],
    permissionsRequired: [PermissionFlagsBits.MuteMembers],
    botPermissionsRequired: [PermissionFlagsBits.MuteMembers],
}
