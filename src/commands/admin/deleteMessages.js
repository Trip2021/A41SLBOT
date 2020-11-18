const Discord = require("discord.js");
const { PREFIX, modsRole } = require("../../../config.json");
module.exports = (client) => {
        client.on("message", async (message) => {
                if (!message.content.startsWith(PREFIX) || message.author.bot)
                        return;

                let args = message.content
                        .slice(PREFIX.length)
                        .trim()
                        .split(/ +/);
                let command = args.shift().toLowerCase();
                if (command === "delete") {
                        const amount = parseInt(args[0]) + 1;

                        if (isNaN(amount)) {
                                return message.reply(
                                        "that doesn't seem to be a valid number."
                                );
                        } else if (amount <= 1 || amount > 100) {
                                return message.reply(
                                        "you need to input a number between 1 and 99."
                                );
                        }
                        if (
                                message.member.roles.cache.some(
                                        (r) => r.name === modsRole
                                )
                        ) {
                                message.channel
                                        .bulkDelete(amount, true)
                                        .catch((err) => {
                                                console.error(err);
                                                message.channel.send(
                                                        ":warning: Due to Discord rules bots can only bulk delete messages that are under 14 days old."
                                                );
                                        });
                                message.reply(
                                        `I've deleted \`${amount}\`  messages for you :thumbsup:`
                                );
                        } else {
                                return message.reply(
                                        `Only ${modsRole} have access to this command`
                                );
                        }
                }
        });
};