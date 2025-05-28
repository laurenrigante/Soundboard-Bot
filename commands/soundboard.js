const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
} = require("discord.js");

const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("soundboard")
    .setDescription("Open the soundboard menu"),

  async execute(interaction) {
    const userVoiceChannel = interaction.member.voice.channel;

    //user must be in a voice channel to use the bot
    if (!userVoiceChannel) {
      return await interaction.reply({
        content: "❌ You must be in a voice channel to use the soundboard.",
        flags: MessageFlags.Ephemeral,
      });
    }
    const existingConnection = getVoiceConnection(interaction.guild.id);

    //bot joins the voice channel that the user is in
    if (
      !existingConnection ||
      existingConnection.joinConfig.channelId !== userVoiceChannel.id
    ) {
      joinVoiceChannel({
        channelId: userVoiceChannel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
        selfDeaf: false,
      });
    }

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

    if (interaction.deferred || interaction.replied) {
      await interaction.followUp({
        content: "🎵 Pick a category:",
        components: [row],
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "🎵 Pick a category:",
        components: [row],
        ephemeral: true,
      });
    }
  },
};
