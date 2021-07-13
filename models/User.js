const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	userId: String,
});

module.exports = mongoose.model("User", userSchema);
