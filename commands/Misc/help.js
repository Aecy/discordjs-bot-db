const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { getNumberInEmoji } = require("../../utils/helper");

module.exports.run = async (client, message, args, settings, dbUser) => {
	const { channel, author } = message;

	const reactions = [{ index: 0, name: "Menu", emoji: "🔢" }];
	const categories = readdirSync("./commands/");

	categories.forEach(name => {
		let index = categories.indexOf(name) + 1;
		const page = { index, name, emoji: getNumberInEmoji(index) };
		reactions.push(page);
	});

	reactions.push({ index: categories.length + 1, name: "Stop", emoji: "⏹️" });

	const embed = new MessageEmbed()
		.setTitle(`Get help from ${client.user.username}`)
		.setColor("YELLOW")
		.setDescription(
			reactions.filter(c => c.emoji !== "🔢" && c.emoji !== "⏹️").map(c => `${c.emoji} - ${c.name} Commands`)
		)
		.setThumbnail(client.user.avatarURL())
		.setFooter(`© 2021 ${client.user.username} | Basic DJSBot powered by Aecy#1290`);

	const helpMessage = await channel.send(embed);

	reactions.forEach(async r => await helpMessage.react(r.emoji));

	const filter = (reaction, user) => reactions.map(c => c.emoji).includes(reaction.emoji.name) && (author.id === user.id);
	const collector = helpMessage.createReactionCollector(filter);

	collector.on("collect", (reaction, user) => {
		const { emoji, users } = reaction;

		if (reaction.emoji.name === "⏹️") {
			collector.stop();
			helpMessage.reactions.removeAll();
		} else if (reaction.emoji.name === "🔢") {
			helpMessage.edit(embed);
		} else {
			const category = reactions.find(r => r.emoji === emoji.name);
			const commands = client.commands.filter(c => c.help.category === category.name.toLowerCase());

			const newEmbed = new MessageEmbed()
				.setTitle(`${category.name} Commands`)
				.setColor("YELLOW")
				.setFooter(`❓ Need more help ? Contact us.`);

			commands.forEach(cmd => {
				newEmbed.addField(`\`${settings.prefix}${cmd.help.name}\``, cmd.help.description, true)
			});

			helpMessage.edit(newEmbed);
		}

		users.remove(user);
	});
};

module.exports.help = {
	name: "help",
	usage: "help",
	category: "misc",
	description: "Show up the help command.",
	cooldown: 3,
	isUserAdmin: false,
	permissions: false,
	args: false,
}