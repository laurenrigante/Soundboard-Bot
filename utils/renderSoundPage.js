const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const SOUNDS_PER_PAGE = 5;
/**
 * This function will build the message content to display the menu of sounds for a category.
 *
 * @param {string} categoryId - The category ("meme", "angry", "happy").
 * @param {Array} soundList - Array of sound objects { label, file } for the category.
 * @param {number} page - The current page number
 * @returns {Object} - Object with `content` string and `components` array for interaction update.
 */
function renderSoundPage(categoryId, soundList, page = 1) {
  //pagination logic
  const totalPages = Math.ceil(soundList.length / SOUNDS_PER_PAGE);

  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  const startIndex = (page - 1) * SOUNDS_PER_PAGE;
  const endIndex = startIndex + SOUNDS_PER_PAGE;
  const soundsToShow = soundList.slice(startIndex, endIndex);

  const soundButtons = soundsToShow.map(
    (sound, i) =>
      new ButtonBuilder()
        .setCustomId(`sound_${categoryId}_${startIndex + i}`) // unique ID for each sound
        .setLabel(sound.label)
        .setStyle(ButtonStyle.Secondary) // grey style
  );

  const soundRow = new ActionRowBuilder().addComponents(soundButtons);

  const paginationButtons = [];

  // disable 'Previous' if on first page
  paginationButtons.push(
    new ButtonBuilder()
      .setCustomId(`paginate_${categoryId}_${page - 1}`)
      .setLabel("⬅️ Previous")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(page === 1)
  );

  // disable 'next' if on last page
  paginationButtons.push(
    new ButtonBuilder()
      .setCustomId(`paginate_${categoryId}_${page + 1}`)
      .setLabel("Next ➡️")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(page === totalPages)
  );

  const paginationRow = new ActionRowBuilder().addComponents(paginationButtons);

  const content = `🎧 Sounds in category: **${categoryId}** (Page ${page} of ${totalPages})`;

  return {
    content,
    components: [soundRow, paginationRow],
  };
}

module.exports = renderSoundPage;
