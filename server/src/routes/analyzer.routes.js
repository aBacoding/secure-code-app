const express = require("express")
const { verifyToken } = require("../middleware/auth.middleware")
const AnalysisHistory = require("../models/AnalysisHistory")
const claudeClient = require("../utils/claude")

const router = express.Router()

/**
 * @swagger
 * /api/analyzer/analyze:
 *   post:
 *     summary: Analyze code using Claude AI
 *     tags: [Analyzer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - prompt
 *             properties:
 *               code:
 *                 type: string
 *                 description: Code to analyze
 *               prompt:
 *                 type: string
 *                 description: Instructions for analysis
 *     responses:
 *       200:
 *         description: Code analyzed successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/analyze", verifyToken, async (req, res) => {
	try {
		const { code, prompt } = req.body

		if (!code || code.trim() === "") {
			return res.status(400).json({ message: "Code is required" })
		}

		if (!prompt || prompt.trim() === "") {
			return res.status(400).json({ message: "Prompt is required" })
		}

		// Analyze code using Claude API
		const analysisResult = await claudeClient.analyzeCode(code, prompt)

		// Save to history
		const history = new AnalysisHistory({
			userId: req.user.userId,
			code,
			prompt,
			analysisResult,
		})

		await history.save()

		res.json({
			message: "Code analyzed successfully",
			data: {
				analysisResult,
				historyId: history._id,
			},
		})
	} catch (error) {
		console.error("Code analysis error:", error)
		res.status(500).json({ message: error.message })
	}
})

/**
 * @swagger
 * /api/analyzer/history:
 *   get:
 *     summary: Get user's code analysis history
 *     tags: [Analyzer]
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
		const history = await AnalysisHistory.find({ userId: req.user.userId })
			.sort({ timestamp: -1 })
			.select("prompt timestamp")

		res.json({
			message: "Analysis history retrieved successfully",
			data: history,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

/**
 * @swagger
 * /api/analyzer/history/{id}:
 *   get:
 *     summary: Get specific analysis history entry
 *     tags: [Analyzer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Analysis history ID
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
		const historyEntry = await AnalysisHistory.findOne({
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
 * /api/analyzer/history/{id}:
 *   delete:
 *     summary: Delete analysis history entry
 *     tags: [Analyzer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Analysis history ID
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
		const result = await AnalysisHistory.findOneAndDelete({
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
