import React, {FC, useEffect, useState} from 'react';
import Editor, {OnChange} from '@monaco-editor/react';
import { useLoaderData, useParams } from 'react-router-dom';

const MyEditor: FC = () => {
    const [value, setValue] = useState<string>("// some comment");

    const handleEditorChange: OnChange = (newValue, event) => {
        console.log('Here is the current model value:', newValue);
        if (newValue) setValue(newValue);
    };
    const { fileName } = useParams<{ fileName: string }>();
    const [fileContent, setFileContent] = useState<string | undefined>();
    useEffect(() => {
        console.log(fileName)
        // Simulating a data fetch, replace with your actual data fetching logic
        switch (fileName) {
            case "package.json":
                setFileContent('Content of Package.json')
                return
            case 'README.md':
                setFileContent('Content of README.md')
                return
            default:
                setFileContent('Content of README.md')
        }
      }, [fileName]);
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