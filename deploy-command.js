// deploy-commands.js
require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
	new SlashCommandBuilder().setName("67").setDescription("sonion 👶🧅"),
  new SlashCommandBuilder()
    .setName('greet')
    .setDescription('Greets a user')
    .addStringOption(opt => opt.setName('name').setDescription('Name to greet').setRequired(true))
].map(c => c.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands }
  );
  console.log('Commands registered.');
})();

