const { category_name, lobby_name } = require("../../config/config.json").init
let ids = require("../../js/id_safe").ids;

module.exports = {
    name: 'init',
    description: 'Create a new category with a new lobby. Everyone who is in the lobby participates in speeddating.',
    aliases: ['create', 'i', 'make', 'build'],
    args: false,
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    async execute(message, args) {
        const cat = await message.guild.channels.create(category_name, {
            type: 'category',
            position: 1,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    allow: ['VIEW_CHANNEL'],
                }]
        })
        const lobby = await message.guild.channels.create(lobby_name, {
            type: 'voice',
            parent: cat,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    allow: ['VIEW_CHANNEL'],
                }]
        })
        ids.category = cat.id;
        ids.lobby = lobby.id;
        ids.initiated = true;

        message.channel.send("Channels successfully initialised")
    },
};