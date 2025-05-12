const axios = require("axios")
require("dotenv").config()

/**
 * Claude API client for code generation
 */
class ClaudeApiClient {
	constructor(apiKey) {
		this.apiKey = apiKey || process.env.ANTHROPIC_API_KEY
		if (!this.apiKey) {
			throw new Error("ANTHROPIC_API_KEY environment variable is required")
		}
		this.baseUrl = "https://api.anthropic.com/v1/messages"
	}

	/**
	 * Generate code from a prompt using Claude API
	 * @param {string} prompt - User's prompt for code generation
	 * @param {string} [model='claude-3-haiku-20240307'] - Claude model to use
	 * @returns {Promise<string>} Generated code
	 */
	async generateCode(prompt, model = "claude-3-haiku-20240307") {
		try {
			const response = await axios.post(
				this.baseUrl,
				{
					model: model,
					max_tokens: 4000,
					messages: [
						{
							role: "user",
							content: [
								{
									type: "text",
									text: `Generate only code without explanations in response to the following prompt: ${prompt}`,
								},
							],
						},
					],
				},
				{
					headers: {
						"Content-Type": "application/json",
						"x-api-key": this.apiKey,
						"anthropic-version": "2023-06-01",
					},
				}
			)

			// Extract the code from Claude's response
			if (
				response.data &&
				response.data.content &&
				response.data.content.length > 0
			) {
				const responseText = response.data.content[0].text

				// Extract code between code blocks if present
				const codeBlockRegex =
					/```(?:javascript|js|jsx|ts|tsx)?\s*([\s\S]*?)```/g
				let match
				let extractedCode = ""

				// Try to extract code from code blocks
				let foundCodeBlock = false
				while ((match = codeBlockRegex.exec(responseText)) !== null) {
					extractedCode += match[1].trim() + "\n\n"
					foundCodeBlock = true
				}

				// Return extracted code or full text if no code blocks found
				return foundCodeBlock ? extractedCode.trim() : responseText.trim()
			}
			throw new Error("Invalid response from Claude API")
		} catch (error) {
			console.error("Claude API error:", error.response?.data || error.message)
			throw new Error(`Failed to generate code: ${error.message}`)
		}
	}

	/**
	 * Analyze code using Claude API
	 * @param {string} code - Code to be analyzed
	 * @param {string} prompt - User's prompt for analysis instructions
	 * @param {string} [model='claude-3-haiku-20240307'] - Claude model to use
	 * @returns {Promise<string>} Analysis result
	 */
	async analyzeCode(code, prompt, model = "claude-3-haiku-20240307") {
		try {
			const response = await axios.post(
				this.baseUrl,
				{
					model: model,
					max_tokens: 4000,
					messages: [
						{
							role: "user",
							content: [
								{
									type: "text",
									text: `Analyze the following code according to these instructions: ${prompt}\n\nCode to analyze:\n\`\`\`\n${code}\n\`\`\``,
								},
							],
						},
					],
				},
				{
					headers: {
						"Content-Type": "application/json",
						"x-api-key": this.apiKey,
						"anthropic-version": "2023-06-01",
					},
				}
			)

			// Extract the analysis from Claude's response
			if (
				response.data &&
				response.data.content &&
				response.data.content.length > 0
			) {
				return response.data.content[0].text.trim()
			}
			throw new Error("Invalid response from Claude API")
		} catch (error) {
			console.error("Claude API error:", error.response?.data || error.message)
			throw new Error(`Failed to analyze code: ${error.message}`)
		}
	}
}

// Create singleton instance
const claudeClient = new ClaudeApiClient()

module.exports = claudeClient
