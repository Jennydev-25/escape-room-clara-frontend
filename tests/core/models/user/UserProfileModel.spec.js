import { userProfileMapper } from "@/core/mappers/user/user-profile-mapper";
import UserProfileModel from "@/core/models/user/UserProfileModel";
import { describe, expect, test } from "vitest";

describe('UserProfileModel', () => {

    test('UserProfileModel should expose its data', () => {
        const userProfileModel = new UserProfileModel(
            'clara',
            'clara.vega@example.com',
            3,
            'Clara Vega'
        )

        expect(userProfileModel.getAlias()).toEqual('clara')
        expect(userProfileModel.getEmail()).toEqual('clara.vega@example.com')
        expect(userProfileModel.getAvatarId()).toEqual(3)
        expect(userProfileModel.getFullName()).toEqual('Clara Vega')
    })

    test('create should build a UserProfileModel from a dto using a mapper', () => {
        const dto = {
            alias: 'clara',
            email: 'clara.vega@example.com',
            avatarId: 3,
            fullName: 'Clara Vega'
        }

        const userProfileModel = UserProfileModel.create(dto, userProfileMapper)

        expect(userProfileModel.getAlias()).toEqual('clara')
        expect(userProfileModel.getEmail()).toEqual('clara.vega@example.com')
        expect(userProfileModel.getAvatarId()).toEqual(3)
        expect(userProfileModel.getFullName()).toEqual('Clara Vega')
    })

})
