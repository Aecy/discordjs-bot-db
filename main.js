const { Client, Collection } = require("discord.js");
const { loadCommands, loadEvents } = require("./utils/loader");

const client = new Client({ disableMentions: "everyone", restTimeOffset: 0 });
require("./utils/functions")(client);

client.config = require("./config");
client.mongoose = require("./utils/mongoose");

["commands", "cooldowns"].forEach(x => client[x] = new Collection());

loadCommands(client);
loadEvents(client);

client.mongoose.init();

client.login(client.config.token);
