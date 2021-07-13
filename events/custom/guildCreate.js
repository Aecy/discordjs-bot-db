module.exports = async (client, guild) => {
	await client.createGuild({ guildId: guild.id });
};
