const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const path = require("path")
require("dotenv").config()

const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")
const generateRoutes = require("./routes/generate.routes")
const analyzerRoutes = require("./routes/analyzer.routes")
const errorHandler = require("./middleware/error.middleware")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Swagger configuration
const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Secure Code API",
			version: "1.0.0",
			description: "API documentation for Secure Code application",
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT || 5000}`,
				description: "Development server",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
	},
	apis: ["./src/routes/*.js"], // Path to the API routes
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/generate", generateRoutes)
app.use("/api/analyzer", analyzerRoutes)

// MongoDB connection
mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/secure-code")
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => console.error("MongoDB connection error:", err))

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
