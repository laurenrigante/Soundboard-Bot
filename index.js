require("dotenv").config();
const fs = require("fs");
const path = require("path");
const {
  Client,
  GatewayIntentBits,
  Collection,
  Events,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, //when the bot is added to a server or leaves, Slash commands
    GatewayIntentBits.GuildVoiceStates, //when a user joins or leaves a voice channel
  ],
});

//will hold all the commands we create for the bot
client.commands = new Collection();

// Load commands dynamically
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Handle slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error executing that command!",
        ephemeral: true,
      });
    }
  }

  // Handle button clicks
  else if (interaction.isButton()) {
    const id = interaction.customId;

    if (id.startsWith("category_")) {
      const category = id.split("_")[1];

      const dummySounds = {
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

      const sounds = dummySounds[category] || [];

      const soundButtons = new ActionRowBuilder();
      sounds.forEach((sound, index) => {
        soundButtons.addComponents(
          new ButtonBuilder()
            .setCustomId(`sound_${sound.toLowerCase().replace(" ", "_")}`)
            .setLabel(sound)
            .setStyle(ButtonStyle.Primary)
        );
      });

      await interaction.update({
        content: `🎧 Sounds in category: **${category}**`,
        components: [soundButtons],
      });
    }

    // TODO: IMPLEMENT SOUND PLAYBACK....
    else if (id.startsWith("sound_")) {
      const soundName = id.split("_")[1];
      await interaction.reply({
        content: `🔊 Playing sound: **${soundName}** (not implemented yet)`,
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
