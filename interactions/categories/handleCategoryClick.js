const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const getSoundPath = require("../../utils/getSoundPath");

module.exports = async function handleCategoryClick(interaction) {
  const categoryId = interaction.customId.split("_")[1];

  const sounds = {
    meme: [
      { label: "Fart", file: "fartmeme.mp3" },
      { label: "Bad to the Bone", file: "bad-to-the-bone-meme.mp3" },
      { label: "A Few Moments Later", file: "a-few-moments-later.mp3" },
      { label: "Disgostang", file: "disgusting.mp3" },
      { label: "Do the Roar", file: "do-the-roar-11.mp3" },
      { label: "Shrek Swamp", file: "what-are-you-doing-in-my-swamp.mp3" },
      { label: "Drake Embarrassing", file: "drake-embarrassing.mp3" },
      { label: "Klonk", file: "klonk.mp3" },
      { label: "Im Pickle Rick", file: "picke_rick.mp3" },
      { label: "Vine Boom", file: "vine-boom.mp3" },
      { label: "Windows Startup", file: "windows-xp-startup.mp3" },
    ],
    angry: [
      { label: "This Guy Stinks", file: "this-guy-stinks.mp3" },
      { label: "I Dont Give a Shit", file: "gilbertgottfried.mp3" },
      { label: "wtf", file: "alan-smiling-friends-what-the-fuck.mp3" },
      { label: "Avada Kedavra", file: "avada-kedavra.mp3" },
      { label: "Nooo", file: "nooo.mp3" },
      { label: "Punch", file: "punch-gaming-sound-effect.mp3" },
      { label: "Spongebob Fail", file: "spongebob-fail.mp3" },
      { label: "Steve OOH", file: "steve-old-hurt-sound.mp3" },
      { label: "Sad Music", file: "tf_nemesis.mp3" },
      { label: "Who Cares", file: "who-the-hell-cares-family-guy-peter.mp3" },
    ],
    happy: [
      { label: "Yay", file: "children-yay.mp3" },
      { label: "Ding", file: "ding.mp3" },
      { label: "W's in the Chat", file: "ws-in-de-chat.mp3" },
      { label: "Aha", file: "family-guy-ostrich-laugh.mp3" },
      { label: "Good Morning Pineapple", file: "good-morning-pineapple.mp3" },
      { label: "Jeremy Noise", file: "jeremy-noise.mp3" },
      { label: "Lets a Go", file: "lets-a-go-mario-23.mp3" },
      { label: "Celebration", file: "celebration.mp3" },
    ],
  };

  const soundList = sounds[categoryId];

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
