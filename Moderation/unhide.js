const { MessageEmbed } = require('discord.js');

module.exports = {
    configuration: {
        commandName: "unhide",
        aliases: ['uh'],
        description: "Unhides the channel for everyone",
        syntax: "unhide",
        example: "unhide",
        permissions: "manage_channels",
        parameters: "user/role",
        module: 'moderation'
    },
    run: async (session, message, args) => {
        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${session.mark} ${message.author}: You're **missing** permission: \`manage_channels\``)
                        .setColor(session.warn)
                ]
            });
        }

        const mentioned = message.mentions.members.first() || message.mentions.roles.first();
        if (!mentioned) {
            try {
                await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { VIEW_CHANNEL: null });
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${session.grant} ${message.author}: Channel unhidden from \`@everyone\``)
                            .setColor(session.green)
                    ]
                });
            } catch (error) {
                console.error(error);
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${session.mark} ${message.author}: An error occured, please contact support`)
                            .setColor(session.warn)
                    ]
                });
            }
        } else {
            try {
                await message.channel.permissionOverwrites.edit(mentioned, { VIEW_CHANNEL: null });
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${session.grant} ${message.author}: Channel unhidden from ${mentioned}`)
                            .setColor(session.green)
                    ]
                });
            } catch (error) {
                console.error(error);
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${session.mark} ${message.author}: An error occured, please contact support`)
                            .setColor(session.warn)
                    ]
                });
            }
        }
    }
};
