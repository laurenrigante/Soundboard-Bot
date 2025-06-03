const {
  getVoiceConnection,
  joinVoiceChannel,
  entersState,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const { playSound } = require("../../services/soundService");
const soundmap = require("../../utils/soundMap");

module.exports = async function handleSoundClick(interaction) {
  const userVoiceChannel = interaction.member.voice.channel;
  const guildId = interaction.guild.id;

  if (!userVoiceChannel) {
    return await interaction.reply({
      content: "❌ You must be in a voice channel to play sounds.",
      ephemeral: true,
    });
  }

  // Try to get existing voice connection
  let connection = getVoiceConnection(guildId);

  if (!connection) {
    connection = joinVoiceChannel({
      channelId: userVoiceChannel.id,
      guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
      selfDeaf: false,
    });

    try {
      await entersState(connection, VoiceConnectionStatus.Ready, 5_000);
    } catch (error) {
      connection.destroy();
      return interaction.reply({
        content: "❌ Failed to connect to the voice channel.",
        ephemeral: true,
      });
    }
  } else if (connection.joinConfig.channelId !== userVoiceChannel.id) {
    return interaction.reply({
      content: "❌ I'm already in a different voice channel.",
      ephemeral: true,
    });
  }

  const [_, category, indexStr] = interaction.customId.split("_");
  const index = parseInt(indexStr, 10);

  if (!soundmap[category] || isNaN(index) || !soundmap[category][index]) {
    return await interaction.reply({
      content: "❌ Sound not found.",
      ephemeral: true,
    });
  }

  const soundFile = soundmap[category][index].file;

  try {
    await playSound(connection, category, soundFile);
    await interaction.deferUpdate(); //dont want to send too many chat messages as it will clog the server
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "❌ Failed to play the sound.",
      ephemeral: true,
    });
  }
};
