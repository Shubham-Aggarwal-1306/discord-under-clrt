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
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('A slick little embed')
            .setDescription('Hello, this is a slick embed!').setColor('#0099ff').addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            ).setTimestamp();
        await interaction.reply({ embeds: [embed] });
    }
});


client.on('messageCreate', async message => {
    if (message.content === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('A slick little embed')
            .setDescription('Hello, this is a slick embed!').setColor('#0099ff').addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            ).setTimestamp();
        await message.reply({ embeds: [embed] });
    }
});

client.login(process.env.DISCORD_TOKEN);


