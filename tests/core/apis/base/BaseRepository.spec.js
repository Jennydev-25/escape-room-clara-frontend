import BaseRepository from "@/core/apis/base/BaseRepository";
import { describe, expect, test } from "vitest";

describe('BaseRepository', () => {

    test('get should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new BaseRepository('')

        await expect(repository.get()).rejects.toThrow('¡Ups! Algo salió mal')
    })

    test('getAxios should throw \'¡Ups! Algo salió mal\' when the uri is invalid', async () => {
        const repository = new BaseRepository('')

        await expect(repository.getAxios()).rejects.toThrow('¡Ups! Algo salió mal')
    })

})
