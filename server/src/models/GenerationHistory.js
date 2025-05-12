const mongoose = require("mongoose")

const generationHistorySchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	prompt: {
		type: String,
		required: true,
	},
	generatedCode: {
		type: String,
		required: true,
	},
	language: {
		type: String,
		default: "javascript",
	},
	model: {
		type: String,
		default: "claude-3-haiku-20240307",
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model("GenerationHistory", generationHistorySchema)
