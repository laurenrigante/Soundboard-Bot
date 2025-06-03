const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Disconnect the bot from the voice channel"),

  async execute(interaction) {
    const guildId = interaction.guild.id;
    const connection = getVoiceConnection(guildId);

    if (!connection) {
      return interaction.reply({
        content: "❌ I'm not connected to any voice channel.",
        ephemeral: true,
      });
    }

    connection.destroy();
    return interaction.reply({
      content: "👋 Leaving voice channel now",
      ephemeral: true,
    });
  },
};
