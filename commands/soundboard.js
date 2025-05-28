const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("soundboard")
    .setDescription("Open the soundboard menu"),

  async execute(interaction) {
    // Create a select menu with some sounds
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("category_meme")
        .setLabel("Meme")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("category_angry")
        .setLabel("Angry")
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId("category_happy")
        .setLabel("Happy")
        .setStyle(ButtonStyle.Success)
    );

    await interaction.reply({
      content: "🎵 Pick a category:",
      components: [row],
    });
  },
};
