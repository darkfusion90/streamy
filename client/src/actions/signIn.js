import { SIGN_IN } from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: { userId: userId }
    }
}