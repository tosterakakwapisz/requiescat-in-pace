const Discord = require('discord.js');
const config = require('./config.json');
const bot_client = new Discord.Client();

bot_client.on('ready', () => {
    console.log('Toster BOT is online!');
});

bot_client.on('message', msg => {
    if (
        msg.author.bot === false &&
        msg.channel.name === 'memes' &&
        msg.content !== ''
    ) {
        msg.reply('This is not the channel for that!')
            .then(reply => {
                reply.delete(3000);
            });
        msg.delete(1000);
    }

    if (msg.content === '!delete' &&
        msg.author.tag === 'TheToster#3003'
    ) {
        msg.channel.bulkDelete(10);
    }
});

bot_client.login(config.token);
