import { describe, it, expect, vi} from 'vitest';
import { getAccessToken } from './spotify';

describe('spotify test suite', () => {
    it("should return the token", async () => {
        const token = await getAccessToken()
        expect(token).toBe("hello world");
    })
})