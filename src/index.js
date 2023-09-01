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

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'add') {
        const firstNumber = interaction.options.get('first').value;
        const secondNumber = interaction.options.get('second').value;
        await interaction.reply(`The sum is ${firstNumber + secondNumber}`);
    }
});

client.login(process.env.DISCORD_TOKEN);


