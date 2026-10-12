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

})
