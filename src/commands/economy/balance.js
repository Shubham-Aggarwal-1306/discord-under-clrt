const { ApplicationCommandOptionType, Client, Interaction } = require("discord.js");
const User = require("../../models/User");

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async ( client, interaction ) => {
        if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server.", { ephemeral: true });

        await interaction.deferReply();
        const user = interaction.options.get("user")?.value || interaction.member.id;

        const userObj = await User.findOne({ userId: user, guildId: interaction.guild.id });

        if (!userObj) return interaction.editReply("This user does not have an account.", { ephemeral: true });

        interaction.editReply(user === interaction.member.id ? `You have ${userObj.balance} coins.` : `<@${user}> has ${userObj.balance} coins.`);
    },
    name: "balance",
    description: "Check your balance",
    options: [
        {
            name: "user",
            description: "The user to check the balance of",
            type: ApplicationCommandOptionType.User
        }
    ],
}