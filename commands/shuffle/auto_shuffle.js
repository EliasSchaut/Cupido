const stop = require("./stop")
const shuffle = require("./shuffle")

module.exports = {
    name: 'auto_shuffle',
    description: 'Iterates shuffle and stop. The number of iterations, as well as the duration of an iteration will passed as argument.',
    aliases: ['loop', 'shuffle_loop', 'repeat', 'auto'],
    args: true,
    usage: '[# iterations] [iteration time in minutes] [# user per voice channel]',
    args_min_length: 3,
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    async execute(message, args) {
        if (isNaN(args[0]) || isNaN(args[1]) || isNaN(args[2])) {
            return message.channel.send("All your argument must be a number!")
        }

        const iterations = parseInt(args[0])
        const loop_time = Math.floor(parseFloat(args[1]) * 60 * 1000);
        const members_per_channel = parseInt(args[2]);

        for (let i = 0; i < iterations; i++) {
            message.channel.send(`shuffle ${i + 1}. iteration`);
            await shuffle.execute(message, [ members_per_channel ]);
            await sleep(loop_time);
            message.channel.send(`stop ${i + 1}. iteration`);
            await stop.execute(message, [])
        }

        return message.channel.send("Auto-Shuffle complete")


        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    },
};
