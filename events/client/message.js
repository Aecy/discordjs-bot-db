const { Collection } = require("discord.js");

const { missingArgs, errorMsg } = require("../../utils/helper");

module.exports = async (client, message) => {
	const { guild, channel, mentions, content, member, author } = message;

	const settings = await client.getGuild(guild);
	const dbUser = await client.getUser(member);

	if (author.bot) return;
	if (channel.type === "dm") return client.emit("directMessage", message);

	if (!dbUser) await client.createUser({ userId: member.id });

	if (!content.startsWith(settings.prefix)) return;
	const args = content.slice(settings.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
	if (!command) return;

	if (command.help.disabled) return errorMsg(message, "this command is currently disabled.");
	if (command.help.isUserAdmin && guild.member(mentions.users.first()).hasPermission("KICK_MEMBERS")) return errorMsg(message, "you can't do this on this member.");
	if (command.help.permissions && !member.hasPermission("KICK_MEMBERS")) return errorMsg(message, "you doesn't have access to this command.");
	if (command.help.args && !args.length) return missingArgs(client, message, command);

	if (!client.cooldowns.has(command.help.name)) {
		client.cooldowns.set(command.help.name, new Collection());
	}

	const timeNow = Date.now();
	const timestamps = client.cooldowns.get(command.help.name);
	const cooldown = (command.help.cooldown || 3) * 1000;

	if (timestamps.has(author.id)) {
		const expiration = timestamps.get(author.id) + cooldown;
		if (timeNow < expiration) return errorMsg(message, "you're currently in a cooldown.");
	}

	timestamps.set(author.id, timeNow);

	client.setTimeout(() => timestamps.delete(author.id), cooldown);

	command.run(client, message, args, settings, dbUser);
};