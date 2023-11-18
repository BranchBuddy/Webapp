import React, { FC, useState } from 'react';
import Editor, { OnChange } from '@monaco-editor/react';

const MyEditor: FC = () => {
    const [value, setValue] = useState<string>("// some comment");

    const handleEditorChange: OnChange = (newValue, event) => {
        console.log('Here is the current model value:', newValue);
        if (newValue) setValue(newValue);
    };

    return (
        <Editor
            defaultLanguage="typescript"
            theme={'vs-dark'}
            value={value}
            onChange={handleEditorChange}
        />
    );
}

export default MyEditor;