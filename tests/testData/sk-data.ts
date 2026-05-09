import { faker } from "@faker-js/faker";

export const jenkinsData = {
	projectName: faker.company.name(),
	unsafeCharacters: ["!", "@", "#", ";", "$", "%", "^", ":", "&", "?", "*", "|", "/", ">", "<"],
	errorHeading: "Error",
	errorMessages: {
		emptyProjectName: "No name is specified",
		unsafeCharacterMessage: "is an unsafe character",
		existingNameErrorMessage: "The new name is the same as the current name.",
	}
};