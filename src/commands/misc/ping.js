module.exports = {
    name: "ping",
    description: "Ping!",
    // devOnly: true,
    // testOnly: true,
    // ownerOnly: true,
    // options: Object [],
    // deleted: false,

    callback: async (client, interaction) => {
        await interaction.reply("Pong!");
    }
}