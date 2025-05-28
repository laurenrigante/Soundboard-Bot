const renderSoundPage = require("../../utils/renderSoundPage");
const soundMap = require("../../utils/soundMap");

/**
 * This function runs when a user clicks the next or previous page buttons to navigate
 */
module.exports = async function handlePageNavigation(interaction) {
  console.log("Received interaction customId:", interaction.customId);

  try {
    // Extract category and page number from the customId
    const [_, categoryId, pageStr] = interaction.customId.split("_");
    const page = parseInt(pageStr, 10);

    console.log(`Parsed page: ${page}`);

    const soundList = soundMap[categoryId];

    //if the category doesnt exist show the user a private error msg
    if (!soundList) {
      return interaction.reply({
        content: "Unknown category for pagination.",
        ephemeral: true,
      });
    }

    // Use renderSoundPage to get the new page content and components
    const newPageData = renderSoundPage(categoryId, soundList, page);

    await interaction.update({
      content: newPageData.content,
      components: newPageData.components,
    });
  } catch (error) {
    console.error("Error in handlePageNavigation:", error);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: "Something went wrong.",
        ephemeral: true,
      });
    }
  }
};
