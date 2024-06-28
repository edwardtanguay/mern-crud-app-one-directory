import mongoose from "mongoose";

export const flashcardSchema = new mongoose.Schema(
	{
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
