const { Client, Interaction } = require('discord.js');
const User = require('../../models/User');

const dailyAmount = 500;

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        if (!interaction.inGuild()) return interaction.reply('You can only use this command in a server!', { ephemeral: true });

        try {
            await interaction.deferReply();

            const query = {
                userId: interaction.member.id,
                guildId: interaction.guild.id,
            };

            let user = await User.findOne(query);

            if (user) {
                const lastDailyDate = user.lastDaily.toDateString();
                const currentDate = new Date().toDateString();

                if (lastDailyDate === currentDate) {
                    return interaction.followUp(`You have already claimed your daily reward today!`);
                } 
            } else {
                user = new User({
                    ...query,
                    lastDaily: new Date(),
                });
            }

            user.balance += dailyAmount;
            user.lastDaily = new Date();
            await user.save();

            interaction.editReply(`You have claimed your daily reward of **${dailyAmount}** coins!`);
        } catch (err) {
            console.error("Error with daily command: ", err);
        }
    },
    name: 'daily',
    description: 'Claim your daily reward!',
}