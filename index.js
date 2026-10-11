const fs = require('fs');
const path = require('path');

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => console.log(`Logged in as ${client.user.tag}`));

client.on('messageCreate', (message) => {
  if (message.content === '!ping') message.reply('Pong!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  if (interaction.commandName === 'greet') {
    const name = interaction.options.getString('name');
    await interaction.reply(`Hello, ${name}!`);
  }

	if(interaction.commandName === "67"){
		interaction.reply("son 😭🥀🥀");
	}

});




const JSON_FILE = path.join(__dirname, 'imageUrls.json');

// Make sure the file exists before we start
if (!fs.existsSync(JSON_FILE)) {
  fs.writeFileSync(JSON_FILE, '[]');
}

client.on('messageCreate', (message) => {
  if (message.channel.name !== 'images') return;
  if (message.attachments.size === 0) return;

  // Grab URLs of image attachments only
  const imageUrls = message.attachments
    .filter(att => att.contentType && att.contentType.startsWith('image/'))
    .map(att => att.url);

  if (imageUrls.length === 0) return;

  const current = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
  current.push(...imageUrls);
  fs.writeFileSync(JSON_FILE, JSON.stringify(current, null, 2));

  console.log(`Saved ${imageUrls.length} image URL(s) from #${message.channel.name}`);
});



client.login(process.env.DISCORD_TOKEN);

