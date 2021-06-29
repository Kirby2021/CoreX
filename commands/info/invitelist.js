const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "invitelist",
    timeout: 1000,
    description: "Sends the top 10 inviters in the server",
    aliases: [''],
    run: async(client, message) => {
       
    if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.reply('I do not have the permission \`MANAGE_SERVER\`')

    message.guild.fetchInvites().then((invites) => {
        const inviteCounter = {}

        invites.forEach((invite => {
            const { uses, inviter } = invite
            const { username, discriminator } = inviter

            const name = `${inviter}`

            inviteCounter[name] = (inviteCounter[name] || 0) + uses
        }))

        let replyText = new MessageEmbed()
            .setTitle(`📩 Invitation Cards ${message.guild.name}`)
            .setDescription(` \n`)
            .setColor("BLUE")
        const sortedInvites = Object.keys(inviteCounter).sort((a, b) => inviteCounter[b] - inviteCounter[a])

        if (sortedInvites.length > 10) sortedInvites.length = 10
        else if (sortedInvites.length > 10) sortedInvites.length = sortedInvites.length


        for (const invite of sortedInvites) {
            const count = inviteCounter[invite]
            replyText.description += `\n${invite} has invited ${count} member(s).`
        }
        message.reply(replyText)
    })
    }
}