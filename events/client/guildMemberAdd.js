module.exports = async (client, member) => {
	await client.createUser({
		userId: member.id
	});
};
