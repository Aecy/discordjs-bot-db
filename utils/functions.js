const { Guild, User } = require("../models/index");

const mongoose = require("mongoose");

module.exports = async client => {
	client.createGuild = async guild => {
		const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
		const createdGuild = await new Guild(merged);
		createdGuild.save();
	};

	client.getGuild = async guild => {
		const data = await Guild.findOne({ guildId: guild.id });
		if (data) return data;
		return undefined;
	};

	client.updateGuild = async (guild, settings) => {
		let data = await client.getGuild(guild);
		if (typeof data !== "object") data = {};
		for (const key in settings) {
			if (data[key] !== settings[key]) data[key] = settings[key];
		}
		return data.updateOne(settings);
	};

	client.createUser = async user => {
		const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, user);
		const createdUser = await new User(merged);
		createdUser.save();
	};

	client.getUser = async user => {
		const data = await User.findOne({ userId: user.id });
		if (data) return data;
		return;
	};

	client.updateUser = async (user, settings) => {
		let data = await client.getUser(user);
		if (typeof data !== "object") data = {};
		for (const key in settings) {
			if (data[key] !== settings[key]) data[key] = settings[key];
		}
		return data.updateOne(settings);
	};
};