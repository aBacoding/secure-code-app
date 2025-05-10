const express = require("express")
const User = require("../models/user.model")
const { verifyToken } = require("../middleware/auth.middleware")
const upload = require("../middleware/upload.middleware")
const fs = require("fs")
const path = require("path")

const router = express.Router()

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select(
			"-password -refreshToken"
		)
		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}
		res.json(user)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

/**
 * @swagger
 * /api/users/avatar:
 *   post:
 *     summary: Upload user avatar
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 *       400:
 *         description: Invalid file or upload error
 *       401:
 *         description: Unauthorized
 */
router.post(
	"/avatar",
	verifyToken,
	upload.single("avatar"),
	async (req, res) => {
		try {
			if (!req.file) {
				return res.status(400).json({ message: "No file uploaded" })
			}

			const user = await User.findById(req.user.userId)
			if (!user) {
				return res.status(404).json({ message: "User not found" })
			}

			// Delete old avatar if exists
			if (user.avatar) {
				const oldAvatarPath = path.join(
					__dirname,
					"..",
					user.avatar.replace(/^\/uploads/, "uploads")
				)
				if (fs.existsSync(oldAvatarPath)) {
					fs.unlinkSync(oldAvatarPath)
				}
			}

			// Set new avatar path (relative URL)
			const avatarUrl = `/uploads/avatars/${path.basename(req.file.path)}`
			user.avatar = avatarUrl
			await user.save()

			res.json({
				message: "Avatar uploaded successfully",
				avatar: avatarUrl,
			})
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
)

/**
 * @swagger
 * /api/users/avatar:
 *   delete:
 *     summary: Delete user avatar
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Avatar deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/avatar", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId)
		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		// Delete avatar file if exists
		if (user.avatar) {
			const avatarPath = path.join(
				__dirname,
				"..",
				user.avatar.replace(/^\/uploads/, "uploads")
			)
			if (fs.existsSync(avatarPath)) {
				fs.unlinkSync(avatarPath)
			}

			user.avatar = null
			await user.save()
		}

		res.json({ message: "Avatar deleted successfully" })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put("/profile", verifyToken, async (req, res) => {
	try {
		const { full_name, country } = req.body
		const updateData = {}

		if (full_name !== undefined) updateData.full_name = full_name
		if (country !== undefined) updateData.country = country

		// Only update if there are fields to update
		if (Object.keys(updateData).length === 0) {
			return res.status(400).json({ message: "No fields to update" })
		}

		const user = await User.findByIdAndUpdate(req.user.userId, updateData, {
			new: true,
			runValidators: true,
		}).select("-password -refreshToken")

		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		res.json({
			message: "Profile updated successfully",
			user,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

/**
 * @swagger
 * /api/users/password:
 *   put:
 *     summary: Update user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Current password for verification
 *               newPassword:
 *                 type: string
 *                 description: New password (must meet password requirements)
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid password format or current password is incorrect
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put("/password", verifyToken, async (req, res) => {
	try {
		const { currentPassword, newPassword } = req.body

		// Validate request
		if (!currentPassword || !newPassword) {
			return res.status(400).json({
				message: "Current password and new password are required",
			})
		}

		// Get user with password
		const user = await User.findById(req.user.userId)
		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		// Verify current password
		const isValidPassword = await user.comparePassword(currentPassword)
		if (!isValidPassword) {
			return res.status(400).json({ message: "Current password is incorrect" })
		}

		// Update password
		user.password = newPassword
		await user.save()

		res.json({ message: "Password updated successfully" })
	} catch (error) {
		// Check for validation errors (password format)
		if (error.name === "ValidationError") {
			return res.status(400).json({ message: error.message })
		}
		res.status(500).json({ message: error.message })
	}
})

module.exports = router
