const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/logs-server')

module.exports = {
    name: 'server-logs',
    description: 'Sets/disables server logging.',
    timeout: 5000,
    usage: '<set/disable>',
    aliases: [''], 
    userPerms: ['MANAGE_GUILD'],
    clientPerms: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        options = [
            'set',
            'disable'
        ]

        if (!args.length) return message.channel.send("Please enter either **set** or **disable**")
        const opt = args[0].toLowerCase();
        if (!opt) return message.channel.send('Please enter either **set** or **disable**')


        if (!options.includes(opt)) return message.channel.send('Please enter either **set** or **disable**')

        if(opt === 'set') {
            const channel = await message.mentions.channels.first()
            if(!channel) return message.channel.send('Please mention a channel to set as the server logs')

            schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(!data) {
                    newData = new schema({
                        Guild: message.guild.id,
                        Channel: channel.id
                    })
                    newData.save()
                    const embed = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`<:corexyes:860561725916053514> Server-logs is set to ${channel}`)
                    message.channel.send(embed)
                } else{
                    if(data) {
                        data.delete()
                        new schema({
                            Guild: message.guild.id,
                            Channel: channel.id
                        })
                        data.save()
                        const embed2 = new MessageEmbed()
                        .setColor('GREEN')
                        .setDescription(`<:corexyes:860561725916053514> Server-logs is set to ${channel}`)
                        message.channel.send(embed2)
                }
            }
        })
    }

    if(opt === 'disable') {
        schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(!data) message.channel.send('<:corexerror:860580531825147994> The Server-logs is already disabled')
            data.delete()
            message.channel.send('<:corexyes:860561725916053514> Server logging has been disabled')
        })
    }

    }
}