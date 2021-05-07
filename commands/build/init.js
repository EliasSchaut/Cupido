const { category_name, lobby_name } = require("../../config/config.json").init

module.exports = {
    name: 'init',
    description: 'Create a new lobby',
    aliases: ['create', 'i', 'make', 'build'],
    args: false,
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    execute(message, args) {
        message.guild.channels.create(category_name, {
            type: 'category',
            position: 1,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    allow: ['VIEW_CHANNEL'],
                }]
        }).then(cat => {
            message.guild.channels.create(lobby_name, {
                type: 'voice',
                parent: cat,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL'],
                    }]
            })
        })
    },
};