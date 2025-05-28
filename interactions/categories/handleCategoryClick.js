const soundMap = require("../../utils/soundMap");
const renderSoundPage = require("../../utils/renderSoundPage");

/**
 * This function is triggered when the user clicks a category (happy angry meme)
 * It will load the list of sounds and show the first page
 */
module.exports = async function handleCategoryClick(interaction) {
  const categoryId = interaction.customId.split("_")[1];

  const soundList = soundMap[categoryId];

  //if the category doesnt exist show the user a private error msg
  if (!soundList) {
    return interaction.reply({ content: "Unknown category", ephemeral: true });
  }
  // Render the first page of sounds (page 1)
  const pageData = renderSoundPage(categoryId, soundList, 1);

  // Update the interaction with the first page content and buttons
  await interaction.update({
    content: pageData.content,
    components: pageData.components,
  });
};
