const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
require("dotenv").config()

const authRoutes = require("./routes/auth.routes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

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
	},
	apis: ["./src/routes/*.js"], // Path to the API routes
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Routes
app.use("/api/auth", authRoutes)

// MongoDB connection
mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/secure-code")
	.then(() => console.log("Connected to MongoDB"))
	.catch(err => console.error("MongoDB connection error:", err))

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).json({ message: "Something went wrong!" })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
