require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'add',
        description: 'Add two numbers',
        options: [
            {
                name: 'first',
                type: ApplicationCommandOptionType.Number,
                description: 'The first number',
                choices: [
                    {
                        name: 'One',
                        value: 1,
                    },
                    {
                        name: 'Two',
                        value: 2,
                    },
                    {
                        name: 'Three',
                        value: 3,
                    },
                ],
                required: true,
            },
            {
                name: 'second',
                type: ApplicationCommandOptionType.Number,
                description: 'The second number',
                required: true,
            },
        ],
    },
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
