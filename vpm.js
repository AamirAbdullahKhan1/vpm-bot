const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const TRACKING_CHANNEL_ID = '1249420961741144105';
const playtimeTracker = {};

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    
    if (message.channel.id !== TRACKING_CHANNEL_ID) return;

    const userId = message.author.id;
    const username = message.author.username;

    
    if (message.content.toLowerCase() === 'using') {
        if (playtimeTracker[userId]) {
            message.reply(`You are already marked as using the account!`);
            return;
        }
        playtimeTracker[userId] = Date.now(); 
        message.reply(`${username} has started using the account.`);
    }

    
    if (message.content.toLowerCase() === 'done') {
        if (!playtimeTracker[userId]) {
            message.reply(`You haven't marked yourself as using the account!`);
            return;
        }

        const startTime = playtimeTracker[userId];
        const duration = Date.now() - startTime;
        const minutes = Math.floor(duration / 60000); 
        const seconds = Math.floor((duration % 60000) / 1000); 

        delete playtimeTracker[userId]; 
        message.reply(
            `${username} has finished playing. Total playtime: ${minutes} minutes and ${seconds} seconds.`
        );
    }
});


client.login(process.env.VITE_BOT_TOKEN);
