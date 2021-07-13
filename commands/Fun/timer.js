const { errorMsg, formatBomb } = require("../../utils/helper");

module.exports.run = async (client, message, args, settings, dbUser) => {
	const { channel } = message;

	message.delete();

	let count = Number(args.pop());
	if (!Number.isInteger(count) || count < 1) return errorMsg(message, "the number must be an integer or greater than one.");

	let content = args.join(" ");
	let tick = 1000;

	channel.send(formatBomb(count))
		.then(msg => {
			let timer = client.setInterval(() => {
				if (count > 0) {
					count--;
					msg.edit(formatBomb(count));
				} else {
					clearInterval(timer);
					msg.edit(':boom:');
					client.setTimeout(() => {
						msg.edit(content);
					}, tick);
				}
			}, tick);
		});
};

module.exports.help = {
	name: "timer",
	usage: "timer",
	category: "fun",
	description: "Explode the bomb.",
	cooldown: 3,
	isUserAdmin: false,
	permissions: false,
	args: false,
}