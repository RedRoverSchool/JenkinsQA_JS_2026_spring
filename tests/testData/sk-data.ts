export const jenkinsData = {
	projectName: Math.floor(Math.random() * 10000) + "projectName",
	unsafeCharacters: ["!", "@", "#", ";", "$", "%", "^", ":", "&", "?", "*", "|", "/", ">", "<"],
	errorHeading: "Error",
	errorMessages: {
		emptyProjectName: "No name is specified",
		unsafeCharacterMessage: "is an unsafe character",
		existingNameErrorMessage: "The new name is the same as the current name.",
	}
};