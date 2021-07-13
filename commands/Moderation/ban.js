const { errorMsg } = require("../../utils/helper");

module.exports.run = async (client, message, args, settings, dbUser) => {
	const { mentions } = message;

	const member = mentions.members.first();
	if (!member) return errorMsg(message, "this user can't be find.");
	if (!member.bannable) return errorMsg(message, "this user can't be kicked.");

	let reason = args.slice(1).join(" ");

	member.ban(reason);
};

module.exports.help = {
	name: "ban",
	usage: "ban @user [reason]",
	category: "moderation",
	description: "Ban user from the guild.",
	cooldown: 3,
	isUserAdmin: true,
	permissions: true,
	args: true,
}