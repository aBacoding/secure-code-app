const express = require("express")
const router = express.Router()

/**
 * @swagger
 * /api/docs:
 *   get:
 *     summary: Get API documentation
 *     description: Returns documentation for all available endpoints
 *     responses:
 *       200:
 *         description: A list of all API endpoints with their details
 */
router.get("/", (req, res) => {
	const endpoints = [
		// Auth Routes
		{
			path: "/api/auth/register",
			method: "POST",
			description: "Register a new user",
			requestBody: {
				username: "string (required)",
				email: "string (required)",
				password: "string (required)",
				full_name: "string (optional)",
				country: "string (optional)",
			},
			responses: {
				201: "User registered successfully",
				400: "Validation error or email/username already registered",
				500: "Server error",
			},
		},
		{
			path: "/api/auth/login",
			method: "POST",
			description: "Authenticate a user",
			requestBody: {
				login: "string (required) - username or email",
				password: "string (required)",
			},
			responses: {
				200: "Login successful, returns JWT token, refresh token and user details",
				401: "Invalid credentials",
				500: "Server error",
			},
		},
		{
			path: "/api/auth/refresh",
			method: "POST",
			description: "Refresh access token",
			requestBody: {
				refreshToken: "string (required)",
			},
			responses: {
				200: "Token refreshed successfully, returns new access token",
				401: "Invalid refresh token",
				500: "Server error",
			},
		},
		{
			path: "/api/auth/logout",
			method: "POST",
			description: "Logout user",
			auth: "JWT Token required",
			responses: {
				200: "Logged out successfully",
				401: "Unauthorized",
				500: "Server error",
			},
		},

		// User Routes
		{
			path: "/api/users/profile",
			method: "GET",
			description: "Get authenticated user profile",
			auth: "JWT Token required",
			responses: {
				200: "User profile data",
				401: "Unauthorized",
				404: "User not found",
				500: "Server error",
			},
		},
		{
			path: "/api/users/profile",
			method: "PUT",
			description: "Update user profile",
			auth: "JWT Token required",
			requestBody: {
				full_name: "string (optional)",
				country: "string (optional)",
			},
			responses: {
				200: "Profile updated successfully",
				400: "No fields to update",
				401: "Unauthorized",
				404: "User not found",
				500: "Server error",
			},
		},
		{
			path: "/api/users/avatar",
			method: "POST",
			description: "Upload user avatar",
			auth: "JWT Token required",
			requestBody: {
				avatar: "file (multipart/form-data)",
			},
			responses: {
				200: "Avatar uploaded successfully",
				400: "No file uploaded",
				401: "Unauthorized",
				404: "User not found",
				500: "Server error",
			},
		},
		{
			path: "/api/users/avatar",
			method: "DELETE",
			description: "Delete user avatar",
			auth: "JWT Token required",
			responses: {
				200: "Avatar deleted successfully",
				401: "Unauthorized",
				404: "User not found",
				500: "Server error",
			},
		},
		{
			path: "/api/users/password",
			method: "PUT",
			description: "Update user password",
			auth: "JWT Token required",
			requestBody: {
				currentPassword: "string (required)",
				newPassword: "string (required)",
			},
			responses: {
				200: "Password updated successfully",
				400: "Invalid password format or incorrect current password",
				401: "Unauthorized",
				404: "User not found",
				500: "Server error",
			},
		},

		// Generate Routes
		{
			path: "/api/generate/code",
			method: "POST",
			description: "Generate code using Claude AI",
			auth: "JWT Token required",
			requestBody: {
				prompt: "string (required)",
				language: "string (optional, default: javascript)",
			},
			responses: {
				200: "Code generated successfully",
				400: "Invalid request",
				401: "Unauthorized",
				500: "Server error",
			},
		},
		{
			path: "/api/generate/history",
			method: "GET",
			description: "Get user's code generation history",
			auth: "JWT Token required",
			responses: {
				200: "History retrieved successfully",
				401: "Unauthorized",
				500: "Server error",
			},
		},
		{
			path: "/api/generate/history/{id}",
			method: "GET",
			description: "Get specific generation history entry",
			auth: "JWT Token required",
			parameters: {
				id: "string (path parameter) - Generation history ID",
			},
			responses: {
				200: "History entry retrieved successfully",
				401: "Unauthorized",
				404: "History entry not found",
				500: "Server error",
			},
		},
		{
			path: "/api/generate/history/{id}",
			method: "DELETE",
			description: "Delete generation history entry",
			auth: "JWT Token required",
			parameters: {
				id: "string (path parameter) - Generation history ID",
			},
			responses: {
				200: "History entry deleted successfully",
				401: "Unauthorized",
				404: "History entry not found",
				500: "Server error",
			},
		},

		// Analyzer Routes
		{
			path: "/api/analyzer/analyze",
			method: "POST",
			description: "Analyze code using Claude AI",
			auth: "JWT Token required",
			requestBody: {
				code: "string (required)",
				prompt: "string (required)",
			},
			responses: {
				200: "Code analyzed successfully",
				400: "Invalid request",
				401: "Unauthorized",
				500: "Server error",
			},
		},
		{
			path: "/api/analyzer/history",
			method: "GET",
			description: "Get user's code analysis history",
			auth: "JWT Token required",
			responses: {
				200: "Analysis history retrieved successfully",
				401: "Unauthorized",
				500: "Server error",
			},
		},
		{
			path: "/api/analyzer/history/{id}",
			method: "GET",
			description: "Get specific analysis history entry",
			auth: "JWT Token required",
			parameters: {
				id: "string (path parameter) - Analysis history ID",
			},
			responses: {
				200: "History entry retrieved successfully",
				401: "Unauthorized",
				404: "History entry not found",
				500: "Server error",
			},
		},
		{
			path: "/api/analyzer/history/{id}",
			method: "DELETE",
			description: "Delete analysis history entry",
			auth: "JWT Token required",
			parameters: {
				id: "string (path parameter) - Analysis history ID",
			},
			responses: {
				200: "History entry deleted successfully",
				401: "Unauthorized",
				404: "History entry not found",
				500: "Server error",
			},
		},

		// Documentation Routes
		{
			path: "/api/docs",
			method: "GET",
			description: "Get API documentation",
			responses: {
				200: "List of all API endpoints with details",
			},
		},
		{
			path: "/api/examples",
			method: "GET",
			description: "Get API usage examples",
			responses: {
				200: "List of examples showing how to use the API",
			},
		},
	]

	res.json({
		name: "Secure Code API",
		version: "1.0.0",
		description: "API for analyzing and securing code from vulnerabilities",
		baseUrl: process.env.API_URL || "http://localhost:5000",
		endpoints,
	})
})

module.exports = router
