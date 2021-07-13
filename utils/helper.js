const { MessageEmbed } = require("discord.js");

const missingArgs = (client, message, command) => {
	const { channel } = message;

	const embed = new MessageEmbed()
		.setTitle(`Missing arguments for ${command.help.name}`)
		.setDescription("There are missing arguments for this command!")
		.setColor("RED")
		.setThumbnail(client.user.avatarURL())
		.addField(
			`ℹ️ **Usage**`,
			`
\`\`\`
${client.config.prefix}${command.help.usage}
\`\`\`
			`
		)
		.setFooter(`❓ Get more help with ${client.config.prefix}help ${command.help.name}`);

	return channel.send(embed);
};

const errorMsg = (message, text) => {
	const { channel, author } = message;

	const embed = new MessageEmbed()
		.setDescription(`❌ | **${author.tag}**, ${text}`)
		.setColor("RED");

	return channel.send(embed);
};

const successMsg = () => {
	const { channel, author } = message;

	const embed = new MessageEmbed()
		.setDescription(`✅ | **${author.tag}**, ${text}`)
		.setColor("GREEN");

	return channel.send(embed);
};

const getNumberInEmoji = (n) => {
	if (n === 1) return "1️⃣";
	if (n === 2) return "2️⃣";
	if (n === 3) return "3️⃣";
	if (n === 4) return "4️⃣";
	if (n === 5) return "5️⃣";
	if (n === 6) return "6️⃣";
	if (n === 7) return "7️⃣";
	if (n === 8) return "8️⃣";
	if (n === 9) return "9️⃣";
	if (n === 10) return "🔟";
};

const formatBomb = (count) => {
	return `:bomb: ${'-'.repeat(count)} ${count}`;
};

module.exports = {
	missingArgs,
	errorMsg,
	successMsg,
	getNumberInEmoji,
	formatBomb
};
