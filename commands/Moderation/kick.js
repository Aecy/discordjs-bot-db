const { errorMsg } = require("../../utils/helper");

module.exports.run = async (client, message, args, settings, dbUser) => {
	const { mentions } = message;

	const member = mentions.members.first();
	if (!member) return errorMsg(message, "this user can't be find.");
	if (!member.kickable) return errorMsg(message, "this user can't be kicked.");

	let reason = args.slice(1).join(" ");

	member.kick(reason);
};

module.exports.help = {
	name: "kick",
	usage: "kick @user [reason]",
	category: "moderation",
	description: "Kick user from the guild.",
	cooldown: 3,
	isUserAdmin: false,
	permissions: true,
	args: true,
}