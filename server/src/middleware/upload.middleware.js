const multer = require("multer")
const path = require("path")
const fs = require("fs")

// Set storage engine
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const uploadPath = path.join(__dirname, "../uploads/avatars")

		// Create directory if it doesn't exist
		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath, { recursive: true })
		}

		cb(null, uploadPath)
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
		const fileExt = path.extname(file.originalname)
		cb(null, "avatar-" + uniqueSuffix + fileExt)
	},
})

// Check file type
const fileFilter = (req, file, cb) => {
	// Accept only image files
	const allowedFileTypes = /jpeg|jpg|png|gif|webp/
	const extname = allowedFileTypes.test(
		path.extname(file.originalname).toLowerCase()
	)
	const mimetype = allowedFileTypes.test(file.mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else {
		cb(new Error("Only image files are allowed"), false)
	}
}

// Set up upload
const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
	fileFilter: fileFilter,
})

module.exports = upload
