const Discord = require('discord.js');
const config = require('./config.json');
const BotClient = new Discord.Client();

BotClient.on('ready', () => {
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
        try {
            msg.channel.bulkDelete(10)
                .then(reply =>
                    reply.delete(3000));
        } catch (error) {
            console.error;
        }
    }

    if (msg.content === '!ping') msg.reply('Pong!');
});

BotClient.login(config.token);