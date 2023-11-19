import React, {FC, useContext, useEffect, useState} from 'react';
import Editor, {OnChange} from '@monaco-editor/react';
import {useLoaderData, useParams} from 'react-router-dom';
import {FileStructureContext} from "../ contexts/FileStructureContent";

const MyEditor: FC = () => {
    const {selectedFile, setSelectedFile} = useContext(FileStructureContext);
    const [value, setValue] = useState<string>("// some comment");

    const handleEditorChange: OnChange = (newValue, event) => {
        console.log('Here is the current model value:', newValue);
        if (newValue) setValue(newValue);
    };
    const {fileName} = useParams<{ fileName: string }>();
    const [fileContent, setFileContent] = useState<string | undefined>();
    useEffect(() => {
        console.log(fileName)
        // Simulating a data fetch, replace with your actual data fetching logic
    }, [fileName]);
    return (
        <Editor
            defaultLanguage="typescript"
            theme={'vs-dark'}
            value={selectedFile}
            onChange={handleEditorChange}
        />
    );
}

export default MyEditor;