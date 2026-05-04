export const jenkinsData = {
    folderName: 'Folder_1',
    generateItemName: () => `Item_${Math.random().toString(10).substring(2, 4)}`,
    dashboardItemsCount: 6,
    createdDashboardItems: [] as string[]
}