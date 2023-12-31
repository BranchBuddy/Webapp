import React, {FC, useContext, useEffect, useState} from 'react';
import Editor, {OnChange} from '@monaco-editor/react';
import {FileStructureContext} from "../ contexts/FileStructureContent";
import {FileStructure} from "../components/general/SideBarNav/SideBar";
import {getFileContentFromStructure} from '../components/general/NavBar';

function getLanguageFromFileName(fileName: string): string {
    const fileExtension = fileName.split('.').pop()!.toLowerCase();

    if (fileExtension === 'js' || fileExtension === 'jsx') {
        return 'JavaScript';
    } else if (fileExtension === 'ts' || fileExtension === 'tsx') {
        return 'TypeScript';
    } else if (fileExtension === 'py') {
        return 'Python';
    } else if (fileExtension === 'java') {
        return 'Java';
    } else if (fileExtension === 'cpp') {
        return 'C++';
    } else if (fileExtension === 'html') {
        return 'HTML';
    } else if (fileExtension === 'css') {
        return 'CSS';
    } else {
        // Add more conditions as needed
        return 'Unknown';
    }
}


export function setFileContentFromStructure(fileStructure: FileStructure[], filePath: string, content: string): FileStructure[] {
    const pathParts = filePath.split('/');
    let currentLevel = fileStructure;

    for (let i = 1; i < pathParts.length; i++) {
        const part = pathParts[i];

        const item = currentLevel.find((item) => item.name === part);

        if (!item) {
            // Path not found
            return fileStructure;
        }

        if (item.type === 'file' && i === pathParts.length - 1) {
            // Found the file, return its content
            item.content = content;
            return fileStructure;
        }

        if (item.type === 'folder') {
            // Move to the next level of the hierarchy
            currentLevel = item.children || [];
        }
    }

    // Path points to a folder, not a file
    return fileStructure;

}

const MyEditor: FC = () => {
    const {selectedFile, setExtractedContents, extractedContents} = useContext(FileStructureContext);
    const [fileContent, setFileContent] = useState<string>('');
    const handleEditorChange: OnChange = (newValue, event) => {
        if (newValue) {
            setFileContent(newValue);
            setExtractedContents(setFileContentFromStructure(extractedContents, selectedFile, newValue));
        }
    };

    useEffect(() => {
        console.log("Running useEffect in Editor.tsx");
        setFileContent(getFileContentFromStructure(extractedContents, selectedFile) || '');
    });

    // const {fileName} = useParams<{ fileName: string }>();


    return (
        <Editor
            defaultLanguage="typescript"
            language={getLanguageFromFileName(selectedFile)}
            theme={'vs-dark'}
            value={fileContent}
            onChange={handleEditorChange}
        />
    );
}

export default MyEditor;
