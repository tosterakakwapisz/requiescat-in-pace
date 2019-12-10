const Discord = require('discord.js');
const token = 'NjU0MTAwNjM1MTg4MzMwNTI2.XfApCA.Kt6VeaiT_NGcjZtQMbF825dKPko';
const bot_client = new Discord.Client();

bot_client.on('ready', () => {
    console.log('Toster BOT is online!');
});

bot_client.on('message', msg => {
    if (msg.content === 'hello') {
        msg.reply('hello world!');
    }
});
bot_client.login(token);