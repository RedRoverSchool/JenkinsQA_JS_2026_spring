export const folderData = {
    namePrefix: 'Test Folder',

    generateName(): string {
        return `${this.namePrefix} ${Date.now()}`;
    }
}
