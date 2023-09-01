const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    try {
        if (!interaction.isButton()) return;
        await interaction.deferReply({ ephemeral: true });
        const role = interaction.guild.roles.cache.get(interaction.customId);
        if (!role) throw new Error('Role not found!');
        const member = interaction.guild.members.cache.get(interaction.user.id);
        if (!member) throw new Error('Member not found!');
        if (member.roles.cache.has(role.id)) {
            await member.roles.remove(role);
            interaction.editReply({ content: `You have been removed from the ${role.name} role!` });
        } else {
            await member.roles.add(role);
            interaction.editReply({ content: `You have been added to the ${role.name} role!` });
        }
    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.DISCORD_TOKEN);


