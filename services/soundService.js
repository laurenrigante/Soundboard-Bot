const {
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  entersState,
} = require("@discordjs/voice");
const getSoundPath = require("../utils/getSoundPath");

let idleTimeout;

async function playSound(connection, category, filename) {
  const soundPath = getSoundPath(category, filename);

  // clear the existing idle timeout when a new sound is clicked
  if (idleTimeout) {
    clearTimeout(idleTimeout);
    idleTimeout = null;
  }

  const player = createAudioPlayer();
  const resource = createAudioResource(soundPath);

  player.play(resource);
  connection.subscribe(player);

  try {
    await entersState(player, AudioPlayerStatus.Playing, 5_000);
  } catch (error) {
    console.error("Connection failed:", error);
    connection.destroy();
    throw new Error("Failed to connect to voice channel");
  }

  player.on(AudioPlayerStatus.Idle, () => {
    console.log("Playback finished, starting 5 min idle timer...");

    // Start 5 minute timer to disconnect if no new sound plays
    idleTimeout = setTimeout(() => {
      console.log("No sounds played for 5 minutes, leaving voice channel.");
      connection.destroy();
    }, 5 * 60 * 1000);
  });

  return;
}

module.exports = {
  playSound,
};
