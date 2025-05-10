const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// Password validation regex
const passwordRegex =
	/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{8,}$/

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
			maxlength: 30,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			validate: {
				validator: function (v) {
					return passwordRegex.test(v)
				},
				message: props =>
					"Password must be at least 8 characters long, contain at least one uppercase letter, one special character, and only English characters",
			},
		},
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

// Hash password before saving
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next()

	try {
		const salt = await bcrypt.genSalt(10)
		this.password = await bcrypt.hash(this.password, salt)
		next()
	} catch (error) {
		next(error)
	}
})

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User
