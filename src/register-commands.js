require('dotenv').config();
const {REST, Routes} = require('discord.js');

const commands = [
    {
        name: 'hey',
        description: 'Says hello back to you',
    },
    {
        name: 'ping',
        description: 'Replies with pong',
    }
];

const rest = new REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands},
        );
        console.log('Successfully registered application commands.');
    } catch (error) {
        console.log(`Error registering commands: ${error}`);
    }
})();
