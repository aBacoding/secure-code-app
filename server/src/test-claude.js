/**
 * Test script for Claude API integration
 * Run this script with: node src/test-claude.js
 */

const claudeClient = require("./utils/claude")

async function testClaudeAPI() {
	try {
		console.log("Testing Claude API for code generation...")
		const prompt =
			"Write a simple JavaScript function that returns the factorial of a number"
		console.log(`Prompt: "${prompt}"`)

		console.log("Sending request to Claude API...")
		const result = await claudeClient.generateCode(prompt)

		console.log("\nGenerated code:")
		console.log("--------------")
		console.log(result)
		console.log("--------------")
		console.log("API test completed successfully!")
	} catch (error) {
		console.error("Error testing Claude API:", error.message)
	}
}

testClaudeAPI()
