const multer = require("multer")

// Error handling middleware
const errorHandler = (err, req, res, next) => {
	console.error(err.stack)

	// Handle Multer errors
	if (err instanceof multer.MulterError) {
		if (err.code === "LIMIT_FILE_SIZE") {
			return res.status(400).json({
				message: "File too large. Maximum size is 5MB.",
			})
		}
		return res.status(400).json({
			message: `Upload error: ${err.message}`,
		})
	}

	// Handle other errors
	if (err.message === "Only image files are allowed") {
		return res.status(400).json({
			message: err.message,
		})
	}

	res.status(500).json({
		message: "Something went wrong!",
	})
}

module.exports = errorHandler
