const { Client, Message } = require('discord.js');
const Level = require('../../models/Level');
const calculateLevelXp = require('../../utils/calculateLevelXP');
const cooldowns = new Set();

function getRandomXp() {
    const min = 1;
    const max = 30;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {Client} client
 * @param {Message} message
    */
module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (!message.inGuild()) return;
    if (cooldowns.has(message.author.id)) return;

    const xp = getRandomXp();

    const query = {
        userId: message.author.id,
        guildId: message.guild.id,
    };

    try {
        const level = await Level.findOne(query);
        if (level) {
            level.xp += xp;
            if (level.xp >= calculateLevelXp(level.level)) {
                level.level += 1;
                level.xp = 0;
                message.channel.send(`Congrats ${message.author}! You are now level ${level.level}`);
            }
            await level.save().catch(err => console.log("Error saving level: ", err));
        } else {
            const newLevel = new Level({
                userId: message.author.id,
                guildId: message.guild.id,
                xp,
                level: 0,
            });
            await newLevel.save().catch(err => console.log("Error saving new level: ", err));
        }
        cooldowns.add(message.author.id);
        setTimeout(() => {
            cooldowns.delete(message.author.id);
        }, 10000);
    } catch (err) {
        console.log("Error giving user xp: ", err);
    }
}