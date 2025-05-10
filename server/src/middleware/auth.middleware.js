const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({ message: "No token provided" })
	}

	const token = authHeader.split(" ")[1]

	try {
		const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
		req.user = decoded
		next()
	} catch (error) {
		return res.status(403).json({ message: "Invalid token" })
	}
}

const verifyRefreshToken = async (req, res, next) => {
	const { refreshToken } = req.body

	if (!refreshToken) {
		return res.status(401).json({ message: "Refresh token is required" })
	}

	try {
		const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
		const user = await User.findById(decoded.userId)

		if (!user || user.refreshToken !== refreshToken) {
			return res.status(403).json({ message: "Invalid refresh token" })
		}

		req.user = decoded
		next()
	} catch (error) {
		return res.status(403).json({ message: "Invalid refresh token" })
	}
}

module.exports = {
	verifyToken,
	verifyRefreshToken,
}
