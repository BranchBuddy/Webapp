import { redirect } from 'react-router-dom';
import { verify } from '../api/collections/auth';

export const verifyAuthToken = async () => {
    try {
        await verify();
        return true;
    } catch (err) {
        return false;
    }
};

export const checkAuthLoader = async () => {
    const verified = await verifyAuthToken();
    if (!verified) {
        return redirect('/auth');
    }
    return null;
};
