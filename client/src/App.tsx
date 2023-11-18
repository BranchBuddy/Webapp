import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import Root from './pages/Root';
import useDarkMode from 'use-dark-mode';
import Editor from './pages/Editor';

const RoutesJSX = (
    <>
        <Route path="/" element={<Root />}>
        <Route path="/:fileName" element={<Editor />} />
        </Route>
    </>
);

const routes = createRoutesFromElements(RoutesJSX);

const router = createBrowserRouter(routes);

function App() {
    const darkMode = useDarkMode();

    return (
        <NextUIProvider>
                <main
                    className={`${
                        darkMode.value ? 'dark' : ''
                    } text-foreground bg-background`}
                >
                    <RouterProvider router={router} />
                </main>
        </NextUIProvider>
    );
}

export default App;
