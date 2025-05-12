const mongoose = require("mongoose")

const analysisHistorySchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
	prompt: {
		type: String,
		required: true,
	},
	analysisResult: {
		type: String,
		required: true,
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

module.exports = mongoose.model("AnalysisHistory", analysisHistorySchema)
