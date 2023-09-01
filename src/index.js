const {Client, IntentsBitField} = require('discord.js');
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

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content === 'hello') {
        await message.reply('hello');
    }
});

client.login(process.env.DISCORD_TOKEN);


