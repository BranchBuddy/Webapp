import React, {FC, useContext, useEffect, useState} from 'react';
import Editor, {OnChange} from '@monaco-editor/react';
import {FileStructureContext} from "../ contexts/FileStructureContent";
import {FileStructure} from "../components/general/SideBarNav/SideBar";

const MyEditor: FC = () => {
    const {selectedFile, setExtractedContents, extractedContents} = useContext(FileStructureContext);
    const [fileContent, setFileContent] = useState<string>('');

    const handleEditorChange: OnChange = (newValue, event) => {
        if (newValue) {
            setFileContent(newValue);
            setExtractedContents(setFileContentFromStructure(extractedContents, selectedFile, newValue));
        }
    };

    function getFileContentFromStructure(fileStructure: FileStructure[], filePath: string): string | undefined {
        const pathParts = filePath.split('/');
        let currentLevel = fileStructure;

        for (let i = 1; i < pathParts.length; i++) {
            const part = pathParts[i];

            const item = currentLevel.find((item) => item.name === part);

            if (!item) {
                // Path not found
                return undefined;
            }

            if (item.type === 'file' && i === pathParts.length - 1) {
                // Found the file, return its content
                return item.content;
            }

            if (item.type === 'folder') {
                // Move to the next level of the hierarchy
                currentLevel = item.children || [];
            }
        }

        // Path points to a folder, not a file
        return undefined;
    }

    function setFileContentFromStructure(fileStructure: FileStructure[], filePath: string, content: string): FileStructure[] {
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

    useEffect(() => {
        setFileContent(getFileContentFromStructure(extractedContents, selectedFile) || '');
    }, [selectedFile]);

    // const {fileName} = useParams<{ fileName: string }>();


    return (
        <Editor
            defaultLanguage="typescript"
            theme={'vs-dark'}
            value={fileContent}
            onChange={handleEditorChange}
        />
    );
}

export default MyEditor;