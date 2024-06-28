import {
	IFlashcard,
	IMongoFlashcard,
	INewFlashcard,
	IPatchFlashcard,
} from "../../../src/shared/interfaces";
import { getDb, getSuuid } from "./dbtools";
// import { Flashcard } from "../schemas/flashcardSchema";

const db = await getDb();

export const getAllFlashcardsOLD = () => {
	if (db === null) {
		throw new Error("ERROR: database does not exist");
	}
	return db.data.flashcards;
};

export const getAllFlashcards = () => {
	return new Promise<IMongoFlashcard[]>((resolve) => {
		(async () => {
			const flashcards = [
				{
					"_id": "111",
					"suuid": "2Rz81V",
					"category": "linux",
					"front": "find out the current directory",
					"back": "pwd"
				},
				{
					"_id": "222",
					"suuid": "82Js23",
					"category": "linux",
					"front": "how to find out your Linux shell",
					"back": "echo $0"
				},
			]
			// const flashcards = await Flashcard.find();
			resolve(flashcards);
		})();
	})

}
// if (db === null) {
// 	throw new Error("ERROR: database does not exist");
// }
// try {
// 	const flashcards = await Flashcard.find();
// 	res.json(flashcards);
// } catch (error) {
// 	handleError(res, error);
// }
// };

export const getOneFlashcard = (suuid: string) => {
	if (db === null) {
		throw new Error("ERROR: database does not exist");
	}
	const flashcard = db.data.flashcards.find((m) => m.suuid === suuid);

	if (flashcard) {
		return flashcard;
	} else {
		return null;
	}
};

export const addFlashcard = async (newFlashcard: INewFlashcard) => {
	if (db === null) {
		throw new Error("ERROR: database does not exist");
	}
	const flashcard: IFlashcard = {
		suuid: getSuuid(),
		...newFlashcard,
	};
	db.data.flashcards.unshift(flashcard);
	await db.write();
	return flashcard;
};

export const replaceFlashcard = async (replacementFlashcard: IFlashcard) => {
	if (db === null) {
		throw new Error("ERROR: database does not exist");
	}
	const formerFlashcard = db.data.flashcards.find(
		(m) => m.suuid === replacementFlashcard.suuid
	);
	if (formerFlashcard) {
		formerFlashcard.category = replacementFlashcard.category;
		formerFlashcard.front = replacementFlashcard.front;
		formerFlashcard.back = replacementFlashcard.back;
		await db.write();
		return formerFlashcard;
	} else {
		return null;
	}
};

export const replaceSomeFieldsInFlashcard = async (
	suuid: string,
	patchFlashcard: IPatchFlashcard
) => {
	if (db === null) {
		throw new Error("ERROR: database does not exist");
	}
	const formerFlashcard = db.data.flashcards.find((m) => m.suuid === suuid);
	if (formerFlashcard) {
		if (patchFlashcard.category)
			formerFlashcard.category = patchFlashcard.category;
		if (patchFlashcard.front) formerFlashcard.front = patchFlashcard.front;
		if (patchFlashcard.back) formerFlashcard.back = patchFlashcard.back;
		await db.write();
		return formerFlashcard;
	} else {
		return null;
	}
};

export const deleteFlashcard = async (suuid: string) => {
	if (db === null) {
		throw new Error("ERROR: database does not exist");
	}
	const flashcard = db.data.flashcards.find((m) => m.suuid === suuid);
	const indexToRemove = db.data.flashcards.findIndex(
		(item) => item.suuid === suuid
	);
	if (indexToRemove !== -1) {
		db.data.flashcards.splice(indexToRemove, 1);
	}

	if (flashcard) {
		await db.write();
		return flashcard;
	} else {
		return null;
	}
};
