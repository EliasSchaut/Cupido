const { prefix } = require('../../config/config.json');
let ids = require("../../js/id_safe").ids;

module.exports = {
    name: 'shuffle',
    description: 'Start a shuffle',
    aliases: ['start', 'run'],
    args: true,
    usage: '[# user per voice channel]',
    args_min_length: 1,
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    async execute(message, args) {
        if (isNaN(args[0])) {
            return message.channel.send("Your argument must be a number!")
        }

        if (!ids.initiated) {
            return message.channel.send(`You must first initialize the voice channels buy typing \`${prefix}init\``);
        }

        if (ids.shuffle_ids.length !== 0) {
            return message.channel.send(`A shuffle is already running. Type \`${prefix}stop\` to exit.`)
        }

        // get members
        let members = await message.guild.channels.cache.get(ids.lobby).members;
        const num_of_members = members.size;
        if (num_of_members === 0) {
            return message.channel.send("There are no users in the channel.")
        }

        // create channels
        const members_per_channel = parseInt(args[0]);
        const category = await message.guild.channels.cache.get(ids.category);
        const needed_channels = Math.floor(num_of_members / members_per_channel);
        const rest = num_of_members % members_per_channel;
        for (let i = 0; i < needed_channels; i++) {
            const channel = await message.guild.channels.create(i.toString(), {
                type: 'voice',
                parent: category,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL'],
                    }]
            })

            ids.shuffle_ids.push(channel.id);
        }

        // shuffle members
        members = members.sort(() => Math.random() - 0.5);

        // move members
        const channels = await message.guild.channels.cache;
        for (let i = 0; i < needed_channels; i++) {
            for (let j = 0; j < members_per_channel; j++) {
                const member = members.first();
                await member.voice.setChannel(channels.get(ids.shuffle_ids[i]));
                members.delete(member.id);
            }

            if (i === (needed_channels - 1)) {
                for (let j = 0; j < rest; j++) {
                    const member = members.first();
                    await member.voice.setChannel(channels.get(ids.shuffle_ids[i]));
                    members.delete(member.id);
                }
            }
        }
    },
};
