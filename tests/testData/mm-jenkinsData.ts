import { pipeline } from "stream";

export const jenkinsData = {
    jobName: "mmItem1",
    folderName: "mmFolder",
    projectCategory: {
        freestyle: "FreeStyleProject",
        folder: "Folder",
        pipeline: "mmPipeLine",
    },
    manageJenkins: {
        systemConfigurationOptions: [ 'System', 'Tools', 'Plugins', 'Nodes', 'Clouds', 'Appearance' ],
    },
    dropdown: {
        dropdownFolder: [ 'Configure', 'New Item', 'Delete Folder', 'Build History', 'Rename', 'Credentials' ],
    },
    configureCategory: {
        description: "mmPipeline description",
    },   
};