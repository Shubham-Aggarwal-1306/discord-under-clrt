const { ApplicationCommandOptionType, Client, Interaction, AttachmentBuilder } = require("discord.js");
const calculateLevelXP = require("../../utils/calculateLevelXP");
const Level = require("../../models/Level");
const canvacord = require("canvacord");

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        if (!interaction.inGuild()) {
            message.reply("You can only use this command in a server!");
            return;
        }

        await interaction.deferReply();

        const user = interaction.options.get("user")?.value || interaction.member.id;

        const userObject = await interaction.guild.members.fetch(user);
        const fetchLevel = await Level.findOne({
            userId: user,
            guildId: interaction.guild.id,
        });

        if (!fetchLevel) {
            return await interaction.editReply(`${userObject.user.tag} doesn't have any levels!`);
        } 

        const allLevels = await Level.find({
            guildId: interaction.guild.id,
        }).select("-_id userId xp level");

        allLevels.sort((a, b) => {
            if (b.level === a.level) {
                return b.xp - a.xp;
            } else {
                return b.level - a.level;
            }
        });

        let currentRank = allLevels.findIndex((level) => level.userId === user) + 1;

        const rank = new canvacord.Rank()
            .setAvatar(userObject.user.displayAvatarURL({ size:256}))
            .setCurrentXP(fetchLevel.xp)
            .setLevel(fetchLevel.level)
            .setRank(currentRank)
            .setRequiredXP(calculateLevelXP(fetchLevel.level))
            .setStatus(userObject.presence?.status)
            .setProgressBar("#4c447a ", "COLOR")
            .setUsername(userObject.user.username)
            .setDiscriminator(userObject.user.discriminator);

        const data = await rank.build();

        const attachment = new AttachmentBuilder(data);

        await interaction.editReply({
            files: [attachment],
        });
    },
    name: "level",
    description: "Shows your current level",
    options: [
        {
            name: "user",
            description: "The user to show the level of",
            type: ApplicationCommandOptionType.Mentionable,
        }
    ],
}

