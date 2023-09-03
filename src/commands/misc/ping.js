module.exports = {
    name: "ping",
    description: "Ping!",
    // devOnly: true,
    // testOnly: true,
    // ownerOnly: true,
    // options: Object [],
    // deleted: false,

    callback: async (client, interaction) => {
        await interaction.deferReply();
        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        await interaction.editReply(`Pong! Latency: ${ping}ms! API Latency: ${client.ws.ping}ms`);
    }
}