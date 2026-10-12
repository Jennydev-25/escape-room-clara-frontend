import FolderRepository from "@/core/apis/folder/FolderRepository";
import FolderService from "@/core/apis/folder/FolderService";
import { describe, expect, test } from "vitest";

describe('Integration - Folder Service', () => {

    test('listFolders should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new FolderRepository()
        repository.uri = ''
        const service = new FolderService(repository)

        await expect(service.listFolders()).rejects.toThrow('¡Ups! Algo salió mal')
    })

})

describe('Unit - Folder Service', () => {

    test('listFolders should map the backend response to a list of FolderSummaryModel', async () => {
        const fakeRepository = {
            listFolders: () => Promise.resolve([
                { code: 'leeme', name: 'Léeme' },
                { code: 'tomas', name: 'Tomás' }
            ])
        }
        const service = new FolderService(fakeRepository)

        const folders = await service.listFolders()

        expect(folders).toHaveLength(2)
        expect(folders[0].getCode()).toBe('leeme')
        expect(folders[1].getName()).toBe('Tomás')
    })

})
