export const jenkinsData = {
	projectName: Math.floor(Math.random() * 10000) + "projectName",
	unsafeCharacters: ["!", "@", "#", ";", "$", "%", "^", ":", "&", "?", "*", "|", "/", ">", "<"],
	errorHeading: "Error",
	errorMessages: {
		emptyProjectName: "No name is specified",
		unsafeCharacterMessage: "is an unsafe character"
	}
};