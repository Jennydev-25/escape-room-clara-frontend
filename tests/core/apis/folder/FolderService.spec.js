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

    test('getFolder should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new FolderRepository()
        repository.uri = ''
        const service = new FolderService(repository)

        await expect(service.getFolder('tomas')).rejects.toThrow('¡Ups! Algo salió mal')
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

    test('getFolder should ask for the folder code and map the response to a FolderModel', async () => {
        let receivedCode
        const fakeRepository = {
            getFolder: (code) => {
                receivedCode = code
                return Promise.resolve({
                    code: 'tomas',
                    name: 'Tomás',
                    puzzles: [{ id: 2, title: 'Capítulo 2: Tomás Elorza', type: 'CIPHER', displayOrder: 1 }]
                })
            }
        }
        const service = new FolderService(fakeRepository)

        const folder = await service.getFolder('tomas')

        expect(receivedCode).toBe('tomas')
        expect(folder.getName()).toBe('Tomás')
        expect(folder.getPuzzles()[0].getTitle()).toBe('Capítulo 2: Tomás Elorza')
    })

})
