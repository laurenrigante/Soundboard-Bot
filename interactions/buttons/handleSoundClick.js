const {
  getVoiceConnection,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  entersState,
  VoiceConnectionStatus,
} = require("@discordjs/voice");
const path = require("path");

module.exports = async function handleSoundClick(interaction) {
  const userVoiceChannel = interaction.member.voice.channel;
  const guildId = interaction.guild.id;

  //double check that the user is in a voice channel
  if (!userVoiceChannel) {
    return await interaction.reply({
      content: "❌ You must be in a voice channel to play sounds.",
      ephemeral: true,
    });
  }

  // check if bot is connected to voice
  const connection = getVoiceConnection(guildId);

  if (!connection || connection.joinConfig.channelId !== userVoiceChannel.id) {
    return await interaction.reply({
      content: "❌ I'm not connected to your voice channel.",
      ephemeral: true,
    });
  }

  const soundName = interaction.customId.replace("sound_", "");

  const soundPath = path.join(__dirname, "../../sounds", `${soundName}.mp3`);
  const resource = createAudioResource(soundPath);
  const player = createAudioPlayer();

  player.play(resource);
  connection.subscribe(player);

  player.once(AudioPlayerStatus.Playing, () => {
    console.log(`🎵 Now playing: ${soundName}`);
  });

  player.once(AudioPlayerStatus.Idle, () => {
    console.log(`✅ Finished playing: ${soundName}`);
  });

  await interaction.reply({
    content: `▶️ Playing **${soundName}**`,
    ephemeral: true,
  });
};
