const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const getSoundPath = require("../../utils/getSoundPath");
const { soundMap } = require("../../utils/soundMap");

module.exports = async function handleCategoryClick(interaction) {
  const categoryId = interaction.customId.split("_")[1];

  const soundList = soundMap[categoryId];

  //if the category doesnt exist show the user a private error msg
  if (!soundList) {
    return interaction.reply({ content: "Unknown category", ephemeral: true });
  }

  //converting each sound to a clickable button
  const soundButtons = soundList.map(
    (sound, i) =>
      new ButtonBuilder()
        .setCustomId(`sound_${categoryId}_${i}`)
        .setLabel(sound.label)
        .setStyle(ButtonStyle.Secondary) //grey
  );

  //row of buttons - maximum of 5 per row
  const row = new ActionRowBuilder().addComponents(soundButtons);

  //update the original message with the new buttons
  await interaction.update({
    content: `🎧 Sounds in category: **${categoryId}**`,
    components: [row],
  });
};
