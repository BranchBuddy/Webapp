import React, {useState, createContext, ReactNode} from "react";
import {FileStructure} from "../components/general/SideBarNav/SideBar";

interface FileStructureContextProps {
    extractedContents: FileStructure[];
    setExtractedContents: React.Dispatch<React.SetStateAction<FileStructure[]>>;
    selectedFile: string;
    setSelectedFile: React.Dispatch<React.SetStateAction<string>>;
}

export const FileStructureContext = createContext<FileStructureContextProps>(
    {
        extractedContents: [],
        setExtractedContents: () => {
        },
        selectedFile: '',
        setSelectedFile: () => {
        },

    });

interface FileStructureContextProviderProps {
    children: ReactNode;
}

export const FileStructureContextProvider: React.FC<FileStructureContextProviderProps> = ({children}) => {
    const [extractedContents, setExtractedContents] = useState<FileStructure[]>([]);

    const [selectedFile, setSelectedFile] = useState<string>('');
    return (
        <FileStructureContext.Provider value={{extractedContents, setExtractedContents, selectedFile, setSelectedFile}}>
            {children}
        </FileStructureContext.Provider>
    );
};