require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, //when the bot is added to a server or leaves, Slash commands
  ],
});

//will hold all the commands created for the bot
client.commands = new Collection();

// Load commands dynamically form the 'commands' folder
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

//event handler for when the bot is ready
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Handles interactions (slash commands, button clicks)
client.on(Events.InteractionCreate, async (interaction) => {
  //1) handling slash commands
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return; //ignore unknown commands

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

  // 2) handling button clicks
  else if (interaction.isButton()) {
    const id = interaction.customId;

    //handling category click
    if (id.startsWith("category_")) {
      const handleCategoryClick = require("./interactions/categories/handleCategoryClick");
      return handleCategoryClick(interaction);
    } else if (id.startsWith("paginate_")) {
      const handlePageNavigation = require("./interactions/navigation/handlePageNavigation");
      return handlePageNavigation(interaction);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
