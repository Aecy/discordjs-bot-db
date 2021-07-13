const { readdirSync } = require("fs");

module.exports = {
	loadCommands: (client, dir = "./commands/") => {
		readdirSync(dir).forEach(subDir => {
			const commands = readdirSync(`${dir}/${subDir}/`)
				.filter(c => c.endsWith(".js"));

			commands.forEach(cmd => {
				const command = require(`../${dir}/${subDir}/${cmd}`);
				client.commands.set(command.help.name, command);
				console.log(`[🟢] ${command.help.name}.`)
			});
		});
	},

	loadEvents: (client, dir = "./events/") => {
		readdirSync(dir).forEach(subDir => {
			const events = readdirSync(`${dir}/${subDir}`)
				.filter(e => e.endsWith(".js"));

			events.forEach(e => {
				const event = require(`../${dir}/${subDir}/${e}`);
				const eventName = e.split(".")[0];
				client.on(eventName, event.bind(null, client));
				console.log(`[🔁] ${eventName}.`);
			});
		});
	}
};
