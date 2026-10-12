import FolderRepository from "@/core/apis/folder/FolderRepository";
import { describe, expect, test } from "vitest";

describe('Integration - Folder Repository', () => {

    test('listFolders should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new FolderRepository()
        repository.uri = ''

        await expect(repository.listFolders()).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
