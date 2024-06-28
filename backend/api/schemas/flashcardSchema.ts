import mongoose from "mongoose";

export const flashcardSchema = new mongoose.Schema(
	{
		_id: String,
		suuid: String,
		category: String,
		front: String,
		back: String,
	},
	{
		collection: "flashcards",
		timestamps: true,
	}
);

export const Flashcard = mongoose.model("Flashcard", flashcardSchema);
