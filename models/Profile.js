const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	profileURL: {
		type: String,
		required: true,
		maximum: 40
	},
	company: {
		type: String
	},
	website: {
		type: String
	},
	profession: {
		type: String
		//required: true,
	},
	location: {
		type: String
	},
	status: {
		type: String,
		required: true
	},
	skills: {
		type: [String],
		required: true
	},
	bio: {
		type: String
	},
	github: {
		type: String
	},
	experience: [
		{
			company: {
				type: String,
				required: true
			},
			title: {
				type: String,
				required: true
			},
			location: {
				type: String

			},
			from: {
				type: String

			},
			to: {
				type: String
			},
			current: {
				type: Boolean,
				default: false
			},
			description: {
				type: String
			}

		}
	],
	education: [
		{
			institution: {
				type: String,
				required: true
			},
			degree: {
				type: String,
				required: true
			},
			fieldofstudy: {
				type: String,
				required: true

			},
			from: {
				type: String
			},
			to: {
				type: String
			},

			current: {
				type: Boolean,
				default: false
			},
			description: {
				type: String
			}

		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);