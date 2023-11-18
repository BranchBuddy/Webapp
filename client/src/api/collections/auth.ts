import { ApiClient } from '../ApiClient';

export interface User {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    createdAt?: Date;
}

const apiClient = new ApiClient();

export async function getUser(id: string): Promise<User> {
    return await apiClient.get<User>(`/users/${id}`);
}

export async function updateUser(id: string, user: User): Promise<User> {
    return await apiClient.put<User>(`/users/${id}`, user, {
        withCredentials: true,
    });
}

export async function deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
}

export async function login(email: string, password: string): Promise<User> {
    return await apiClient.post<User>(
        '/auth/login',
        { email, password },
        { withCredentials: true },
    );
}

export async function register(user: User): Promise<User> {
    return await apiClient.post<User>('/auth/register', user, {
        withCredentials: true,
    });
}

export async function verify(): Promise<User> {
    return await apiClient.get<User>('/auth/verify', {
        withCredentials: true,
    });
}

export async function logout(): Promise<string> {
    return await apiClient.post<string>(
        '/auth/logout',
        {},
        { withCredentials: true },
    );
}
