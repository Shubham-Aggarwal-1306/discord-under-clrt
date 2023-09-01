const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
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

const roles = [
    {
        label: 'Valorant',
        id: '1141598671297859594'
    },
    {
        label: 'DSA',
        id: '1141598128076771419'
    }, 
    {
        label: 'Programming',
        id: '1141599096357007382'
    }
]


client.on('ready', async () => {
    try {
        const channel = client.channels.cache.get('1143448396036845568');
        if (!channel) throw new Error('Channel not found!');

        const row = new ActionRowBuilder();
        roles.forEach(role => {
            row.components.push(
                new ButtonBuilder().setLabel(role.label).setCustomId(role.id).setStyle(ButtonStyle.Primary)
            )
        });

        await channel.send({
            content: 'Click the button to get the role!',
            components: [row]
        });
        process.exit();
    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.DISCORD_TOKEN);