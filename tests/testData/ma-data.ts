
const prefix = Math.random().toString(36).substring(2,5);

export const jenkinsData = {
	jobName: "${prefix}_${faker.word.noun()}",
};
