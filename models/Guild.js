const mongoose = require('mongoose');
const { defaultSettings: defaults } = require('../config');

const guildSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	guildId: String,
	prefix: {
		"type": String,
		"default": defaults.prefix
	}
});

module.exports = mongoose.model("Guild", guildSchema);
