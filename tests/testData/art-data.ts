function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const number = getRandomInt(100);

export const jenkinsData = {
	jobName: `Project-${number}`,
	folder: `folderNew-${number}`,
	displayName: "Example",
	description: "Something text"
};
