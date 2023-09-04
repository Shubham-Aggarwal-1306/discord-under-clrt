const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');
const dotenv = require('dotenv');
const eventHandler = require('./handlers/eventHandler');
const { default: mongoose } = require('mongoose');
dotenv.config();
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
    ]
});
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            keepAlive: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
})();
eventHandler(client);

client.login(process.env.DISCORD_TOKEN);


