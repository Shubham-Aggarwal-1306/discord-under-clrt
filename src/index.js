const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');
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

let status = [
    {
        name: 'with discord.js',
        type: ActivityType.Streaming,
        url: 'https://www.twitch.tv/monstercat'
    },
    {
        name: 'Slaying Monsters',
        type: ActivityType.Playing,
    },
    {
        name: 'Lurking',
        type: ActivityType.Watching,
    },
]

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(() => {
        let randomStatus = status[Math.floor(Math.random() * status.length)];
        client.user.setActivity(randomStatus);
    }, 1000);
});


client.login(process.env.DISCORD_TOKEN);


