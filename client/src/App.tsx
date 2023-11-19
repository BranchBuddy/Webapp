import React from 'react';
import {NextUIProvider} from '@nextui-org/react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import Root from './pages/Root';
import useDarkMode from 'use-dark-mode';
import MyEditor from "./pages/Editor";
import {FileStructureContextProvider} from "./ contexts/FileStructureContent";
import {getFileContentAfterCommit} from "./api/GitHubHandler";

const RoutesJSX = (
    <>
        <Route path="/" element={<Root/>}>
            <Route index element={<MyEditor/>}/>
        </Route>
    </>
);

const routes = createRoutesFromElements(RoutesJSX);

const router = createBrowserRouter(routes);

function App() {
    const darkMode = useDarkMode();

    const owner = 'BranchBuddy';
    const repo = 'Webapp';
    const commitHash = 'c82c54eb9e68437c274f5ccd1f372fbfd0522e46';
    const filePath = 'client/src/pages/Editor.tsx';
    

    return (
        <NextUIProvider>
            <FileStructureContextProvider>
                <main
                    id={'main'}
                    className={`${
                        darkMode.value ? 'dark' : 'dark'
                    } text-foreground bg-background`}
                >
                    <RouterProvider router={router}/>
                </main>
            </FileStructureContextProvider>
        </NextUIProvider>
    );
}

export default App;
