const express = require("express")
const router = express.Router()

/**
 * @swagger
 * /api/examples:
 *   get:
 *     summary: Get usage examples for the API
 *     description: Returns examples of how to use the API with sample code and expected outputs
 *     responses:
 *       200:
 *         description: A list of examples showing how to use the API
 */
router.get("/", (req, res) => {
	const examples = [
		{
			title: "SQL Injection Vulnerability Analysis",
			description:
				"Analyzing a PHP code snippet for SQL injection vulnerabilities",
			sampleCode: `<?php
$username = $_POST['username'];
$password = $_POST['password'];
$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$result = mysqli_query($connection, $query);
?>`,
			language: "php",
			analysisResult: {
				vulnerable: true,
				vulnerabilityType: "SQL Injection",
				severity: "High",
				location: { line: 3, column: 1 },
				description:
					"User input is directly concatenated into SQL query without sanitization",
				recommendation:
					"Use prepared statements or parameterized queries to prevent SQL injection attacks",
			},
			fixedCode: `<?php
$username = $_POST['username'];
$password = $_POST['password'];
$stmt = $connection->prepare("SELECT * FROM users WHERE username=? AND password=?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();
?>`,
		},
		{
			title: "Cross-Site Scripting (XSS) Prevention",
			description:
				"Fixing a JavaScript function that is vulnerable to XSS attacks",
			sampleCode: `function displayUserComment(comment) {
  document.getElementById('comments').innerHTML += comment;
}`,
			language: "javascript",
			analysisResult: {
				vulnerable: true,
				vulnerabilityType: "Cross-Site Scripting (XSS)",
				severity: "High",
				location: { line: 2, column: 41 },
				description:
					"User input is directly inserted into HTML without sanitization",
				recommendation: "Sanitize user input before inserting it into the DOM",
			},
			fixedCode: `function displayUserComment(comment) {
  const sanitizedComment = DOMPurify.sanitize(comment);
  document.getElementById('comments').innerHTML += sanitizedComment;
}`,
		},
		{
			title: "Directory Traversal Vulnerability",
			description:
				"Detecting and fixing a potential path traversal vulnerability in Node.js",
			sampleCode: `const fs = require('fs');
const path = require('path');

function readUserFile(filename) {
  const filePath = './user_files/' + filename;
  return fs.readFileSync(filePath, 'utf8');
}`,
			language: "javascript",
			analysisResult: {
				vulnerable: true,
				vulnerabilityType: "Path Traversal",
				severity: "Medium",
				location: { line: 4, column: 23 },
				description:
					"Direct concatenation of user input to file paths can lead to directory traversal attacks",
				recommendation:
					"Validate and sanitize file paths, use path.join() with path.normalize()",
			},
			fixedCode: `const fs = require('fs');
const path = require('path');

function readUserFile(filename) {
  // Prevent path traversal by validating filename
  if (filename.includes('..') || filename.includes('/')) {
    throw new Error('Invalid filename');
  }
  const filePath = path.join('./user_files', filename);
  return fs.readFileSync(filePath, 'utf8');
}`,
		},
		{
			title: "Insecure Random Number Generation",
			description: "Improving the security of a random token generator",
			sampleCode: `function generateToken() {
  return Math.random().toString(36).substring(2, 15);
}`,
			language: "javascript",
			analysisResult: {
				vulnerable: true,
				vulnerabilityType: "Weak Randomness",
				severity: "Medium",
				location: { line: 2, column: 10 },
				description:
					"Math.random() is not cryptographically secure and should not be used for security-sensitive operations",
				recommendation:
					"Use crypto.randomBytes() for generating secure random values",
			},
			fixedCode: `const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(16).toString('hex');
}`,
		},
	]

	res.json({
		description: "Example usage scenarios of the Secure Code API",
		howToUse:
			"These examples show how the API can analyze and fix common security vulnerabilities in code",
		examples,
	})
})

module.exports = router
