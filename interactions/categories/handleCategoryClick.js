const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async function handleCategoryClick(interaction) {
  const categoryId = interaction.customId.split("_")[1];

  const sounds = {
    meme: [
      "Fart",
      "Bad to the Bone",
      "A Few Moments Later",
      "Disgostang",
      "Do the Roar",
      "Shrek Swamp",
      "Drake Embarrassing",
      "Klonk",
      "Im Pickle Rick",
      "Vine Boom",
      "Windows Startup",
    ],
    angry: [
      "This Guy Stinks",
      "I Dont Give a Shit",
      "Avada Kedavra",
      "Nooo",
      "Punch",
      "Spongebob Fail",
      "Steve OOH",
      "Sad Music",
      "Who Cares",
    ],
    happy: [
      "Yay",
      "Ding",
      "Aha",
      "Good Morning Pineapple",
      "Jeremy Noise",
      "Lets a Go",
      "W's in the Chat",
      "Celebration",
    ],
  };

  const soundList = sounds[categoryId];

  if (!soundList) {
    return interaction.reply({ content: "Unknown category", ephemeral: true });
  }

  const soundButtons = soundList.map((label, i) =>
    new ButtonBuilder()
      .setCustomId(`sound_${categoryId}_${i}`)
      .setLabel(label)
      .setStyle(ButtonStyle.Secondary)
  );

  const row = new ActionRowBuilder().addComponents(soundButtons);

  await interaction.update({
    content: `🎧 Sounds in category: **${categoryId}**`,
    components: [row],
  });
};
