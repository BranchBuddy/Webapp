import React, { type FormEvent, useContext, useRef, useState } from 'react';
import {
    Tabs,
    Tab,
    Input,
    Button,
    Link,
    Card,
    CardBody,
} from '@nextui-org/react';
import { login, register } from '../api/collections/auth';
import { AuthContext } from '../contexts/AuthContext';
import { AxiosError } from 'axios';
import { type ApiError } from '../api/ApiClient';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const navigate = useNavigate();
    const { setLoggedIn, setUser } = useContext(AuthContext);

    const nameInput = useRef<HTMLInputElement>(null);
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const [selected, setSelected] = useState('login');
    const [error, setError] = useState<string | undefined>(undefined);

    const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!emailInput.current || !passwordInput.current) {
            setError('Please fill in required fields');
        }
        const email = emailInput.current?.value;
        const password = passwordInput.current?.value;

        try {
            const user = await login(email as string, password as string);
            setLoggedIn(true);
            setUser(user);
        } catch (error) {
            setLoggedIn(false);
            setUser(undefined);
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError;
                const axiosErrorData = axiosError.response?.data as ApiError;
                setError(axiosErrorData.message);
            }
        }
    };

    const handleSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            !nameInput.current ||
            !emailInput.current ||
            !passwordInput.current
        ) {
            setError('Please fill in required fields');
        }
        const name = nameInput.current?.value;
        const email = emailInput.current?.value;
        const password = passwordInput.current?.value;

        try {
            const user = await register({
                name,
                email,
                password,
            });
            setLoggedIn(true);
            setUser(user);
        } catch (error) {
            setLoggedIn(false);
            setUser(undefined);
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError;
                const axiosErrorData = axiosError.response?.data as ApiError;
                setError(axiosErrorData.message);
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Card className="max-w-full w-[340px] h-[400px]">
                <CardBody className="overflow-hidden">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={(key: React.Key) => {
                            setSelected(key.toString());
                            setError(undefined);
                        }}
                    >
                        <Tab key="login" title="Login">
                            <form
                                onSubmit={(e) => {
                                    void handleSubmitLogin(e).then(() => {
                                        navigate('/');
                                    });
                                }}
                                method="post"
                                className="flex flex-col gap-4"
                            >
                                <Input
                                    isRequired
                                    label="Email"
                                    placeholder="Enter your email"
                                    type="email"
                                    ref={emailInput}
                                />
                                <Input
                                    isRequired
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    ref={passwordInput}
                                />
                                <p className="text-center text-small">
                                    Need to create an account?{' '}
                                    <Link
                                        size="sm"
                                        onPress={() => {
                                            setSelected('sign-up');
                                            setError(undefined);
                                        }}
                                    >
                                        Sign up
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        fullWidth
                                        color="primary"
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab key="sign-up" title="Sign up">
                            <form
                                onSubmit={(e) => {
                                    void handleSubmitRegister(e).then(() => {
                                        navigate('/');
                                    });
                                }}
                                className="flex flex-col gap-4 h-[300px]"
                            >
                                <Input
                                    isRequired
                                    label="Name"
                                    placeholder="Enter your name"
                                    type="text"
                                    ref={nameInput}
                                />
                                <Input
                                    isRequired
                                    label="Email"
                                    placeholder="Enter your email"
                                    type="email"
                                    ref={emailInput}
                                />
                                <Input
                                    isRequired
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    ref={passwordInput}
                                />
                                <p className="text-center text-small">
                                    Already have an account?{' '}
                                    <Link
                                        size="sm"
                                        onPress={() => {
                                            setSelected('login');
                                            setError(undefined);
                                        }}
                                    >
                                        Login
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        fullWidth
                                        color="primary"
                                        type="submit"
                                    >
                                        Sign up
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                    {error ? (
                        <p className="text-center text-small text-red-500">
                            {error}
                        </p>
                    ) : undefined}
                </CardBody>
            </Card>
        </div>
    );
};

export default AuthPage;
