const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const {
	verifyToken,
	verifyRefreshToken,
} = require("../middleware/auth.middleware")

const router = express.Router()

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *               email:
 *                 type: string
 *                 format: email
 *               full_name:
 *                 type: string
 *               country:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: Must be at least 8 characters long, contain at least one uppercase letter, one special character, and only English characters
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/register", async (req, res) => {
	try {
		const { username, email, password, full_name, country } = req.body

		// Check if user exists with either username or email
		const existingUser = await User.findOne({
			$or: [{ email }, { username }],
		})

		if (existingUser) {
			if (existingUser.email === email) {
				return res.status(400).json({ message: "Email already registered" })
			}
			if (existingUser.username === username) {
				return res.status(400).json({ message: "Username already taken" })
			}
		}

		const user = new User({ username, email, password, full_name, country })
		await user.save()

		res.status(201).json({ message: "User registered successfully" })
	} catch (error) {
		if (error.name === "ValidationError") {
			return res.status(400).json({ message: error.message })
		}
		res.status(400).json({ message: error.message })
	}
})

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user with username or email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 description: Username or email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", async (req, res) => {
	try {
		const { login, password } = req.body

		// Find user by username or email
		const user = await User.findOne({
			$or: [{ email: login }, { username: login }],
		})

		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" })
		}

		const isValidPassword = await user.comparePassword(password)
		if (!isValidPassword) {
			return res.status(401).json({ message: "Invalid credentials" })
		}

		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.JWT_ACCESS_SECRET,
			{ expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
		)

		const refreshToken = jwt.sign(
			{ userId: user._id },
			process.env.JWT_REFRESH_SECRET,
			{ expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
		)

		user.refreshToken = refreshToken
		await user.save()

		res.json({
			accessToken,
			refreshToken,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				full_name: user.full_name,
				country: user.country,
				avatar: user.avatar,
			},
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Invalid refresh token
 */
router.post("/refresh", verifyRefreshToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId)

		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.JWT_ACCESS_SECRET,
			{ expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
		)

		res.json({ accessToken })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId)
		user.refreshToken = null
		await user.save()

		res.json({ message: "Logged out successfully" })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

module.exports = router
