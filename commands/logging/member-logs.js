const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require("../../models/logs-member");
const emoji = require("../../emoji.json");

module.exports = {
  name: "member-logs",
  description: "Sets/disables member logging.",
  timeout: 5000,
  usage: "<set/disable>",
  aliases: ["memberlogs", "logsmember", "logs-member"],
  userPerms: ["MANAGE_GUILD"],
  clientPerms: [""],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    options = ["set", "disable"];

    if (!args.length)
      return message.channel.send("Please enter either **set** or **disable**");
    const opt = args[0].toLowerCase();
    if (!opt)
      return message.channel.send("Please enter either **set** or **disable**");

    if (!options.includes(opt))
      return message.channel.send("Please enter either **set** or **disable**");

    if (opt === "set") {
      const channel = await message.mentions.channels.first();
      if (!channel)
        return message.channel.send(
          "Please mention a channel to set as the member logs",
        );

      schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) {
          newData = new schema({
            Guild: message.guild.id,
            Channel: channel.id,
          });
          newData.save();
          const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              `${emoji.success} Member-logs is set to ${channel}`,
            );
          message.channel.send(embed);
        } else {
          if (data) {
            data.delete();
            data = new schema({
              Guild: message.guild.id,
              Channel: channel.id,
            });
            data.save();
            const embed2 = new MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `${emoji.success} Member-logs is set to ${channel}`,
              );
            message.channel.send(embed2);
          }
        }
      });
    }

    if (opt === "disable") {
      schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data)
          message.channel.send(
            `${emoji.error} The Member-logs is already disabled`,
          );
        data.delete();
        message.channel.send(
          `${emoji.success} Member logging has been disabled`,
        );
      });
    }
  },
};
