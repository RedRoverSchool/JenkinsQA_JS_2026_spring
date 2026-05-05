function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
const number = getRandomInt(100);

export const jenkinsData = {
	jobName: `Project-${number}`,
	folder: `Folder-${number}`,
	displayName: "Example",
	description: "Something text",
	pipelineName: `Pipeline-${number}`,
	multiConfigProject: `MC-Project-${number}`
};
