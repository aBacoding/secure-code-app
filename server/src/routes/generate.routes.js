const express = require("express")
const { verifyToken } = require("../middleware/auth.middleware")
const GenerationHistory = require("../models/GenerationHistory")
const claudeClient = require("../utils/claude")

const router = express.Router()

/**
 * @swagger
 * /api/generate/code:
 *   post:
 *     summary: Generate code using Claude AI
 *     tags: [Generate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: Prompt for code generation
 *               language:
 *                 type: string
 *                 description: Programming language
 *                 default: javascript
 *     responses:
 *       200:
 *         description: Code generated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/code", verifyToken, async (req, res) => {
	try {
		const { prompt, language = "javascript" } = req.body

		if (!prompt || prompt.trim() === "") {
			return res.status(400).json({ message: "Prompt is required" })
		}

		// Generate code using Claude API
		const generatedCode = await claudeClient.generateCode(prompt)

		// Save to history
		const history = new GenerationHistory({
			userId: req.user.userId,
			prompt,
			generatedCode,
			language,
		})

		await history.save()

		res.json({
			message: "Code generated successfully",
			data: {
				generatedCode,
				historyId: history._id,
			},
		})
	} catch (error) {
		console.error("Code generation error:", error)
		res.status(500).json({ message: error.message })
	}
})

/**
 * @swagger
 * /api/generate/history:
 *   get:
 *     summary: Get user's code generation history
 *     tags: [Generate]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: History retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/history", verifyToken, async (req, res) => {
	try {
		const history = await GenerationHistory.find({ userId: req.user.userId })
			.sort({ timestamp: -1 })
			.select("prompt language timestamp")

		res.json({
			message: "History retrieved successfully",
			data: history,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

/**
 * @swagger
 * /api/generate/history/{id}:
 *   get:
 *     summary: Get specific generation history entry
 *     tags: [Generate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Generation history ID
 *     responses:
 *       200:
 *         description: History entry retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: History entry not found
 *       500:
 *         description: Server error
 */
router.get("/history/:id", verifyToken, async (req, res) => {
	try {
		const historyEntry = await GenerationHistory.findOne({
			_id: req.params.id,
			userId: req.user.userId,
		})

		if (!historyEntry) {
			return res.status(404).json({ message: "History entry not found" })
		}

		res.json({
			message: "History entry retrieved successfully",
			data: historyEntry,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

/**
 * @swagger
 * /api/generate/history/{id}:
 *   delete:
 *     summary: Delete generation history entry
 *     tags: [Generate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Generation history ID
 *     responses:
 *       200:
 *         description: History entry deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: History entry not found
 *       500:
 *         description: Server error
 */
router.delete("/history/:id", verifyToken, async (req, res) => {
	try {
		const result = await GenerationHistory.findOneAndDelete({
			_id: req.params.id,
			userId: req.user.userId,
		})

		if (!result) {
			return res.status(404).json({ message: "History entry not found" })
		}

		res.json({ message: "History entry deleted successfully" })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

module.exports = router
