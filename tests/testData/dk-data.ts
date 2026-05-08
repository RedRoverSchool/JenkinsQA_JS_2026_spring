import { faker, Faker } from "@faker-js/faker";
import { pipeline } from "node:stream";

export const jenkinsData = {
	folderName: "item1",
	piplineName: faker.lorem.word(),
	piplineDesc: faker.lorem.words(),
	pipelineDescNew: faker.lorem.words()

};
